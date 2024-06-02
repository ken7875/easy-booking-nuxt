import { config } from '@vue/test-utils'

// config.global.stubs('font-awesome-icon', {
//     template: '<div></div>'
// })

config.global.stubs = {
    'font-awesome-icon': {
        template: '<div></div>'
    }
}