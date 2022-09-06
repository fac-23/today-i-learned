---
title: "Working with Time"
date: "2022-08-26"
label: "javascript"
author: "Oli Jones"
---


### Main learnings:

- Timezone information can be critical for users
- Considering serverside versus Clientside use of Date.now()
- Constraining or defining upload data format can be useful
- Integration testing



Our application allows users to upload data into our platform using CSV data. To start with were as flexible as possible and permitted users to upload any string into our datetime column without validation. It would be parsed using new Date() and if new Date() yeilded a date object we would render that date.

- The problem:

The timezone information in the `date` object obtained by calling the Date constructor is determined by the physical location of where the code running your Javascript is located (e.g. your browser versus some server in the US). This applies to Date.now() but also when using other methods such as parsing dates. 

We have the issue that users may upload date data in many different formats, some of which won't contain timezone information and some which may be nonsense. In cases such as these we want to default times to UTC+00 which is also known as Greenwich meantime (GMT) but also give users the option to choose the local time in their browser.

The UI for this looks like this:

<img width="612" alt="Screenshot 2022-09-06 at 17 16 45" src="https://user-images.githubusercontent.com/78092825/188687584-384b739f-ab6c-4667-b0b9-918a1cec5d6c.png">


The standardiseDates function stores valid dates as standardised ISOstrings. Invalid dates are still stored unchanged as strings in the database but are not rendered on the frontend.

```ts

function standardiseDates(
    value: RecordValueInput,
    timezone: Maybe<string> | undefined,
    dateColumnIds: string[],
  ){
    if (dateColumnIds.includes(value.imsColumnId)) {
      const importDate = value?.value;

      if (importDate) {
        // https://github.com/marnusw/date-fns-tz#todate
        const zonedDate = toDate(importDate, {
          timeZone: timezone ?? undefined,
        });

        // if correct iso date string provided "yyyy-MM-dd'T'HH':'mm':'ssXXX"
        if (isValid(zonedDate))
          return { ...value, value: zonedDate.toISOString() };

        // else if 'custom' date format e.g. 'dd-MMM-yy' create new date
        const customDate = parseSupportedFormat(importDate);
        if (customDate && timezone) {
          const zonedCustomDate = zonedTimeToUtc(customDate, timezone);

          if (isValid(zonedCustomDate)) {
            return { ...value, value: zonedCustomDate.toISOString() };
          }
        }

        if (customDate && isValid(customDate)) {
          return { ...value, value: customDate.toISOString() };
        }

        // if cannot be parsed do not alter value, store as an invalid string
        return value;
      }
    }

    return value;
  };


function parseSupportedFormat(dateString: string) {
  const date = SUPPORTED_UPLOAD_FORMATS.map((dateFormat) => {
    if (isValid(parse(dateString, dateFormat, new Date()))) {
      return parse(dateString, dateFormat, new Date());
    }
    return null;
  }).filter(Boolean)[0];

  return date;
}




```

The entire time I was working on this project I had a fear that the code was not correct, it was hard testing using the UI as the upload process took a while and knowing of the offsets were being correctly applied was difficult.

So in this instance I decided to write some unit tests with Jest to put my mind at ease, this was worthwhile and helped me cover all areas. This was a great way to test a pure function and didn't take long at all.


This is what the jest tests looked like:

```ts


describe('csv date upload', () => {
  it('Unsupported format', async () => {
    expect(testUpload('20-Jul-2022', undefined)).toEqual('20-Jul-2022');
  });

  it('Incorrect format', async () => {
    expect(testUpload('Not-a-date', undefined)).toEqual('Not-a-date');
  });

  it('Supported custom format', async () => {
    expect(testUpload('30-Jul-22', 'Europe/London')).toEqual(
      '2022-07-29T23:00:00.000Z',
    );
    expect(testUpload('30-Jul-22', 'UTC')).toEqual('2022-07-30T00:00:00.000Z');

    expect(testUpload('30-Jul-22', 'America/Atikokan')).toEqual(
      '2022-07-30T05:00:00.000Z',
    );

    expect(testUpload('30-Jul-22', 'UTC')).toEqual('2022-07-30T00:00:00.000Z');
  });

  it('Supported ISO string', async () => {
    expect(testUpload('2022-08-23T14:18:07.365Z', undefined)).toEqual(
      '2022-08-23T14:18:07.365Z',
    );
    expect(testUpload('2022-08-23T14:18:07.365Z', 'UTC')).toEqual(
      '2022-08-23T14:18:07.365Z',
    );
  });
});

```

On relfection all of this would be much easier if we had some form of frontend validation and contraint on what we allow users to upload, but it's been a good introduction to a tricky topic that has taught me the value of front and backend validation, standardisation and testing.
















````


