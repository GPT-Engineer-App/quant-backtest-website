import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const fetchBacktestRecords = async () => {
  // Simulated API call
  return [
    { id: 1, name: "Backtest 1", date: "2023-05-01", profit: 1000 },
    { id: 2, name: "Backtest 2", date: "2023-05-02", profit: -500 },
    { id: 3, name: "Backtest 3", date: "2023-05-03", profit: 2000 },
  ];
};

const fetchBacktestDetails = async (id) => {
  // Simulated API call
  return {
    id,
    name: `Backtest ${id}`,
    date: "2023-05-01",
    profit: 1000,
    kLineData: [
      { date: "2023-05-01", open: 100, high: 110, low: 95, close: 105 },
      { date: "2023-05-02", open: 105, high: 115, low: 100, close: 110 },
      { date: "2023-05-03", open: 110, high: 120, low: 105, close: 115 },
    ],
    indicators: {
      ma: 105,
      rsi: 60,
    },
    tradeRecords: [
      { id: 1, type: "Buy", price: 100, quantity: 10, date: "2023-05-01" },
      { id: 2, type: "Sell", price: 110, quantity: 5, date: "2023-05-02" },
    ],
    orderRecords: [
      { id: 1, type: "Buy", price: 100, quantity: 10, status: "Filled", date: "2023-05-01" },
      { id: 2, type: "Sell", price: 110, quantity: 5, status: "Filled", date: "2023-05-02" },
    ],
    logs: [
      "2023-05-01 10:00:00 - Backtest started",
      "2023-05-01 10:01:00 - Buy order placed",
      "2023-05-02 11:00:00 - Sell order placed",
      "2023-05-03 12:00:00 - Backtest completed",
    ],
  };
};

const QuantBacktest = () => {
  const [selectedBacktestId, setSelectedBacktestId] = useState(null);

  const { data: backtestDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["backtestDetails", selectedBacktestId],
    queryFn: () => fetchBacktestDetails(selectedBacktestId),
    enabled: !!selectedBacktestId,
  });

  return (
    <div className="space-y-4">
      {selectedBacktestId ? (
        isLoadingDetails ? (
          <p>Loading details...</p>
        ) : (
          <BacktestDetails details={backtestDetails} />
        )
      ) : (
        <p>Select a backtest from the sidebar to view details</p>
      )}
    </div>
  );
};

const BacktestDetails = ({ details }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{details.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Date: {details.date}</p>
          <p>Profit: {details.profit}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>K-Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Placeholder for K-Line Chart */}
          <div className="bg-muted h-64 flex items-center justify-center">
            K-Line Chart Placeholder
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <p>MA: {details.indicators.ma}</p>
          <p>RSI: {details.indicators.rsi}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.tradeRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.price}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.orderRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.price}</TableCell>
                  <TableCell>{record.quantity}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {details.logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuantBacktest;