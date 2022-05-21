export interface CommandModel {
  title: string;
  icon: string;
}

export let Commands = [
  {
    title: 'อุณหภูมิขณะนี้',
    icon: 'bi-thermometer-half'
  },
  {
    title: 'ตั้งอุณหภูมิ',
    icon: 'bi-thermometer-sun'
  },
  {
    title: 'ความเข้มแสงขณะนี้',
    icon: 'bi-lightbulb-fill'
  },
  {
    title: 'เวลาขณะนี้',
    icon: 'bi-clock-fill'
  },
  {
    title: 'เปิดไฟ',
    icon: 'bi-lightbulb'
  },
  {
    title: 'ปิดไฟ',
    icon: 'bi-lightbulb-off'
  },
  {
    title: 'นับถอยหลัง',
    icon: 'bi-stopwatch'
  },
  {
    title: 'ตั้งเวลาเปิด/ปิดไฟ',
    icon: 'bi-alarm'
  }
]
