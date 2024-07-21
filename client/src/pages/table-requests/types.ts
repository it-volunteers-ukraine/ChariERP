export default interface RowItemProps {
  path: string | null;
  responsive: boolean;
  item: {
    id: string;
    doc: string;
    date: string;
    email: string;
    EDRPOU: number;
    organizationName: string;
  };
}
