import React from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import { Person } from '../..';

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Medium.ttf' }],
});

const styles = StyleSheet.create({
  page: { padding: 10 },
  row: { flexDirection: 'row' },
  baseCell: {
    width: '100%',
    fontFamily: 'Roboto',
    flexShrink: 0,
    borderWidth: 1,
    borderColor: '#000',
    padding: 2,
  },
  cell: {
    fontSize: 6,
  },
  headerCell: {
    fontSize: 8,
    backgroundColor: '#eee',
    fontWeight: 'bold',
  },
});

type PdfDocumentProps = {
  data: Person[];
  columns: MRT_ColumnDef<Person>[];
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.length.toString();
  if (typeof value === 'object') return JSON.stringify(value);

  return '';
};

export const PdfDocument = ({ data, columns }: PdfDocumentProps) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.row}>
        {columns.map((col) => (
          <Text key={col.header} style={[styles.baseCell, styles.headerCell]}>
            {col.header}
          </Text>
        ))}
      </View>

      {data.map((row, idx) => (
        <View key={`row-${idx}`} style={styles.row}>
          {columns.map((col, idx) => {
            const value = row[col.accessorKey as keyof Person];
            const displayValue = formatValue(value);

            return (
              <Text key={`col-${idx}`} style={[styles.baseCell, styles.cell]}>
                {displayValue}
              </Text>
            );
          })}
        </View>
      ))}
    </Page>
  </Document>
);
