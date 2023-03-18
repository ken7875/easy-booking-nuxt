import { defineStore } from 'pinia';

interface State {
  date: {
    isoDate: Date[];
    openCalendar: boolean;
    arrowPos: string;
  };
}

interface DateParams {
  dateRangeISO: Date;
  openCalendar: boolean;
  dateOrder: string;
}

export const useDatePicker = defineStore('datePicker', {
  state: (): State => {
    return {
      date: {
        // 傳給後端的時間格式
        isoDate: [new Date(), new Date(new Date().setDate(new Date().getDate() + 1))],
        openCalendar: false,
        arrowPos: '20%'
      }
    };
  },
  actions: {
    getDate(dateParams: DateParams) {
      const { dateRangeISO, openCalendar, dateOrder } = dateParams;
      console.log(dateOrder);
      if (dateOrder === 'from') {
        // this.date.formatDate[0] = dateRange
        this.date.isoDate[0] = dateRangeISO;
        this.date.openCalendar = openCalendar;
        this.date.arrowPos = '60%';
      } else if (dateOrder === 'to') {
        // this.date.formatDate[1] = dateRange
        this.date.isoDate[1] = dateRangeISO;
        this.date.openCalendar = false;
        this.date.arrowPos = '20%';
      }
    }
  }
});
