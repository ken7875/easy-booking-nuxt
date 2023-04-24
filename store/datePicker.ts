import { defineStore } from 'pinia';
interface State {
  date: {
    isoDate: Date[];
    openCalendar: boolean;
  };
}

interface DateParams {
  dateRangeISO: Date;
  openCalendar: boolean;
  dateOrder: string;
}

export const useDatePicker = defineStore('datePicker', {
  state: (): State => {
    const defaultStartDate = new Date();
    defaultStartDate.setHours(0, 0, 0, 0);

    const defaultEndDate = new Date();
    defaultEndDate.setDate(new Date().getDate() + 1);
    defaultEndDate.setHours(0, 0, 0, 0);

    return {
      date: {
        // 傳給後端的時間格式
        isoDate: [defaultStartDate, defaultEndDate],
        openCalendar: false
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
      } else if (dateOrder === 'to') {
        // this.date.formatDate[1] = dateRange
        this.date.isoDate[1] = dateRangeISO;
        this.date.openCalendar = false;
      }
    }
  },
  persist: {
    key: 'hotel-date-range',
    storage: process.client ? sessionStorage : undefined,
    paths: ['date.isoDate'],
    afterRestore: (ctx) => {
      console.log(ctx, 'ctx123');
    }
  }
});
