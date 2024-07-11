export interface AirplaneTicket {
  _id: string;
  from: string;
  to: string;
  boardTime: string;
  arriveTime: string;
  totalTime: number;
  airline: string;
  paid: number;
}
