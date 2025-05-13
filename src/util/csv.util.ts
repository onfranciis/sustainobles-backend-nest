import { AsyncParser, ParserOptions } from '@json2csv/node';

export const CSVParser = async (
  data: unknown[],
  fields?: Record<string, string | undefined>,
) => {
  const transformField = fields
    ? Object.entries(fields).map(([value, label]) => ({
        value,
        label,
      }))
    : undefined;

  if (transformField) {
    transformField.push({
      value: ((row: { createdAt?: string }) => {
        // Format the date
        if (row.createdAt) {
          return new Date(row.createdAt).toLocaleDateString();
        }

        return '';
      }) as unknown as string,
      label: 'Added On',
    });
  }

  const opts: ParserOptions = {
    fields: transformField,
  };
  const transformOpts = {};
  const asyncOpts = {};
  const parser = new AsyncParser(opts, asyncOpts, transformOpts);

  const csv = await parser.parse(data).promise();
  return csv;
};
