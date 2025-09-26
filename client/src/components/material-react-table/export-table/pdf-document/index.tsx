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
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
});

type PdfDocumentProps = {
  data: Person[];
  hiddenColumns?: string[];
  columns: MRT_ColumnDef<Person>[];
};

const columnWidths: Record<string, number> = {
  id: 0.5,
  price: 0.7,
  number: 0.4,
  currency: 0.5,
  description: 2,
  created_at: 0.8,
  updated_at: 0.8,
};

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.length.toString();
  if (typeof value === 'object') return JSON.stringify(value);

  return '';
};

export const PdfDocument = ({ data, columns, hiddenColumns = [] }: PdfDocumentProps) => {
  const visibleColumns = columns.filter((col) => col.accessorKey && !hiddenColumns.includes(col.accessorKey as string));

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.row}>
          {visibleColumns.map((col) => {
            const cellStyle = [
              styles.baseCell,
              styles.headerCell,
              { flex: columnWidths[col.accessorKey as string] || 1 },
            ];

            return (
              <Text key={col.header} style={cellStyle}>
                {col.header}
              </Text>
            );
          })}
        </View>

        {data.map((row, idx) => (
          <View key={`row-${idx}`} style={styles.row}>
            {visibleColumns.map((col, idx) => {
              const value = row[col.accessorKey as keyof Person];
              const displayValue = formatValue(value);
              const cellStyle = [styles.baseCell, styles.cell, { flex: columnWidths[col.accessorKey as string] || 1 }];

              return (
                <Text key={`col-${idx}`} style={cellStyle}>
                  {displayValue}
                </Text>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
};
