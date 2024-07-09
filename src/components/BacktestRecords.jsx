import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchBacktestRecords } from "../pages/QuantBacktest";

const BacktestRecords = () => {
  const { data: backtestRecords, isLoading: isLoadingRecords } = useQuery({
    queryKey: ["backtestRecords"],
    queryFn: fetchBacktestRecords,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backtest Records</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoadingRecords ? (
          <p>Loading records...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backtestRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.profit}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {/* TODO: Implement view functionality */}}
                      variant="outline"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BacktestRecords;