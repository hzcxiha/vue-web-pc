import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Rigester from '@/views/register.vue'
import HomePage from '@/views/homePage.vue'
import ProductsPage from '@/views/productsPage'
import About from '@/views/about'
import Account from '@/views/account'
import Hqj from '@/views/hqj'
import Wzj30 from '@/views/wzj30'
import Wzj60 from '@/views/wzj60'
import Wzj90 from '@/views/wzj90'
import Wzj180 from '@/views/wzj180'
import Wzj360 from '@/views/wzj360'
import NoviceHqj from '@/views/novicehqj'
import NoviceWzj30 from '@/views/novicewzj30'
import NoviceWzj360 from '@/views/novicewzj360'
import NoviceCollection from '@/components/prosTab/noviceCollection'
import WzjCollection from '@/components/prosTab/wzjCollection'
import HqjCollection from '@/components/prosTab/hqjCollection'
import SafetyPage from '@/components/about/aboutContent/safetyPage'
import AboutUs from '@/components/about/aboutContent/aboutUs'
import Business from '@/components/about/aboutContent/business'
import DevHistory from '@/components/about/aboutContent/devHistory'
import Honour from '@/components/about/aboutContent/honour'
import MediaReport from '@/components/about/aboutContent/mediaReport'
import Partner from '@/components/about/aboutContent/partner'
import ProductAdvantage from '@/components/about/aboutContent/productAdvantage'
import Recruit from '@/components/about/aboutContent/recruit'
import TeamInfo from '@/components/about/aboutContent/teamInfo'
import News1 from '@/components/about/reports/news1'
import News2 from '@/components/about/reports/news2'
import News3 from '@/components/about/reports/news3'
import News4 from '@/components/about/reports/news4'
import News5 from '@/components/about/reports/news5'
import News6 from '@/components/about/reports/news6'
import News7 from '@/components/about/reports/news7'
import News8 from '@/components/about/reports/news8'
import WorkEnv from '@/components/about/aboutContent/workEnv'
import CodeLogin from '@/components/container/codeLogin'
import PwdLogin from '@/components/container/pwdLogin'
import Investment from '@/components/proDesDetails/details/investment'
import UserVoice from '@/components/proDesDetails/details/userVoice'
import ProDetail from '@/components/proDesDetails/details/proDetail'
import Asset from '@/components/asset/asset'
import AccountSafety from '@/components/accountSafety/accountSafety'
import SetPayPwd from '@/components/accountSafety/setPayPwd'
import Safe from '@/components/accountSafety/safe'
import ResetPayPwd from '@/components/accountSafety/resetPayPwd'
import ResetLoginPwd from '@/components/accountSafety/resetLoginPwd'
import Certification from '@/components/certification/certification'
import Records from '@/components/records/records'
import AllRecord from '@/components/records/recordContent/all'
import WzjRecord from '@/components/records/recordContent/wzj'
import HqjRecord from '@/components/records/recordContent/hqj'
import WithdrawRecord from '@/components/records/recordContent/withdraw'
import RechargeRecord from '@/components/records/recordContent/recharge'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/productsPage',
      name: 'productsPage',
      component: ProductsPage,
      children: [
        {
          path: 'noviceCollection',
          name: 'noviceCollection',
          component: NoviceCollection
        },
        {
          path: 'wzjCollection',
          name: 'wzjCollection',
          component: WzjCollection
        },
        {
          path: 'hqjCollection',
          name: 'hqjCollection',
          component: HqjCollection
        },
        {
          path: '/productsPage',
          redirect: '/productsPage/noviceCollection'
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: [
        {
          path: 'pwdLogin',
          name: 'pwdLogin',
          component: PwdLogin
        },
        {
          path: 'codeLogin',
          name: 'codeLogin',
          component: CodeLogin
        },
        {
          path: '/login',
          redirect: '/login/pwdLogin'
        }
      ]
    },
    {
      path: '/register',
      name: 'rigester',
      component: Rigester
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      children: [
        {
          path: 'safetyPage',
          name: 'safetyPage',
          component: SafetyPage
        },
        {
          path: 'aboutUs',
          name: 'aboutUs',
          component: AboutUs
        },
        {
          path: 'business',
          name: 'business',
          component: Business
        },
        {
          path: 'devHistory',
          name: 'devHistory',
          component: DevHistory
        },
        {
          path: 'honour',
          name: 'honour',
          component: Honour
        },
        {
          path: 'mediaReport',
          name: 'mediaReport',
          component: MediaReport
        },
        {
          path: 'partner',
          name: 'partner',
          component: Partner
        },
        {
          path: 'productAdvantage',
          name: 'productAdvantage',
          component: ProductAdvantage
        },
        {
          path: 'recruit',
          name: 'recruit',
          component: Recruit
        },
        {
          path: 'teamInfo',
          name: 'teamInfo',
          component: TeamInfo
        },
        {
          path: 'workEnv',
          name: 'workEnv',
          component: WorkEnv
        },
        {
          path: 'news1',
          name: 'news1',
          component: News1
        },
        {
          path: 'news2',
          name: 'news2',
          component: News2
        },
        {
          path: 'news3',
          name: 'news3',
          component: News3
        },
        {
          path: 'news4',
          name: 'news4',
          component: News4
        },
        {
          path: 'news5',
          name: 'news5',
          component: News5
        },
        {
          path: 'news6',
          name: 'news6',
          component: News6
        },
        {
          path: 'news7',
          name: 'news7',
          component: News7
        },
        {
          path: 'news8',
          name: 'news8',
          component: News8
        },
        {
          path: '/about',
          redirect: '/about/productAdvantage'
        }
      ]
    },
    {
      path: '/novicehqj',
      name: 'noviceHqj',
      component: NoviceHqj,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/novicehqj',
          redirect: '/novicehqj/proDetail'
        }
      ]
    },
    {
      path: '/novicewzj30',
      name: 'noviceWzj30',
      component: NoviceWzj30,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/novicewzj30',
          redirect: '/novicewzj30/proDetail'
        }
      ]
    },
    {
      path: '/novicewzj360',
      name: 'noviceWzj360',
      component: NoviceWzj360,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/novicewzj360',
          redirect: '/novicewzj360/proDetail'
        }
      ]
    },
    {
      path: '/hqj',
      name: 'hqj',
      component: Hqj,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/hqj',
          redirect: '/hqj/proDetail'
        }
      ]
    },
    {
      path: '/wzj30',
      name: 'wzj30',
      component: Wzj30,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/wzj30',
          redirect: '/wzj30/proDetail'
        }
      ]
    },
    {
      path: '/wzj60',
      name: 'wzj60',
      component: Wzj60,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/wzj60',
          redirect: '/wzj60/proDetail'
        }
      ]
    },
    {
      path: '/wzj90',
      name: 'wzj90',
      component: Wzj90,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/wzj90',
          redirect: '/wzj90/proDetail'
        }
      ]
    },
    {
      path: '/wzj180',
      name: 'wzj180',
      component: Wzj180,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/wzj180',
          redirect: '/wzj180/proDetail'
        }
      ]
    },
    {
      path: '/wzj360',
      name: 'wzj360',
      component: Wzj360,
      children: [
        {
          path: 'investment',
          name: 'investment',
          component: Investment
        },
        {
          path: 'userVoice',
          name: 'userVoice',
          component: UserVoice
        },
        {
          path: 'proDetail',
          name: 'proDetail',
          component: ProDetail
        },
        {
          path: '/wzj360',
          redirect: '/wzj360/proDetail'
        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      children: [
        {
          path: 'asset',
          name: 'asset',
          component: Asset
        },
        {
          path: 'certification',
          name: 'certification',
          component: Certification
        },
        {
          path: 'records',
          name: 'records',
          component: Records,
          children: [
            {
              path: 'all',
              name: 'all',
              component: AllRecord
            },
            {
              path: 'wzj',
              name: 'wzj',
              component: WzjRecord
            },
            {
              path: 'hqj',
              name: 'hqj',
              component: HqjRecord
            },
            {
              path: 'withdraw',
              name: 'withdraw',
              component: WithdrawRecord
            },
            {
              path: 'recharge',
              name: 'recharge',
              component: RechargeRecord
            },
            {
              path: '/account/records',
              redirect: '/account/records/all'
            }
          ]
        },
        {
          path: 'accountSafety',
          name: 'accountSafety',
          component: AccountSafety,
          children: [
            {
              path: 'setPayPwd',
              name: 'setPayPwd',
              component: SetPayPwd
            },
            {
              path: 'safe',
              name: 'safe',
              component: Safe
            },
            {
              path: 'resetPayPwd',
              name: 'resetPayPwd',
              component: ResetPayPwd
            },
            {
              path: 'resetLoginPwd',
              name: 'resetLoginPwd',
              component: ResetLoginPwd
            },
            {
              path: '/accountSafety',
              redirect: '/accountSafety/safe'
            }
          ]
        },
        {
          path: '/account',
          redirect: '/account/asset'
        }
      ]
    },
    {
      path: '*',
      redirect: '/homePage'
    }
  ]
})
