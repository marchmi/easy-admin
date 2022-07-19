import { nameRule, snRule } from '@/utils/regExp'
export default {
  data () {
    const rtn = {
      mixinRules: {
        snRule: { validator: snRule, rigger: 'change' },
        nameRule: { validator: nameRule, rigger: 'change' }
      }
    }
    return rtn
  }
}