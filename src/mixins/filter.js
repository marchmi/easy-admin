export default {
  methods: {
    dateFilter(time) {
        if(!time){
            return '-'
        }
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDay()
        return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day )
    },
    dateTimeFilter(time) {
        if(!time){
            return '-'
        }
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDay()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day ) + ' ' + (hour >= 10 ? hour : '0' + hour) + ':' + (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second)
    }
  }
}