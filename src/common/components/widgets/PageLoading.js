import React, { Component } from 'react'
import Lottie from '../../../libraries/Lottie'
import '../css/pageLoading.css'
class PageLoading extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false,
      isSuccess: false
    }
    this.hideFeedBack = this.hideFeedBack.bind(this)
  }

  show () {
    this.setState({
      isShow: true,
      isSuccess: false
    })
  }

  async hideFeedBack (isSuccess) {
    this.setState({
      isSuccess
    })
    await setInterval( () => {
      this.setState({
        isShow: false,
      })
    },1500)
  }

  hide (isSuccess) {
    isSuccess !== 'undefined'
    ? this.hideFeedBack(isSuccess)
    : this.setState({
      isShow: false,
    })
  }

  isVisible () {
    const { isShow } = this.state
    return isShow
  }

  componentWillMount () {
    PageLoading.instance = this
  }

  componentWillUnmount () {
    delete PageLoading.instance
  }

  render () {
    const { isShow } = this.state

    if (!isShow) {
      return null
    }

    return (
      <div className='loading-container'>
        <div className='loading-inner'>
          {
            !this.state.isSuccess
            ? <Lottie
                options={{
                  animationData: require('../../../assets/animations/bouncing-fruits.json')
                }}
                style={{
                  margin: '15% auto',
                  width:'15%'
                }}  
              />
            : <Lottie
                options={{
                  animationData: require('../../../assets/animations/success-animation.json')
                }}
                style={{
                  margin: '15% auto',
                  width:'20%'
                }}
              />
          } 
        </div>
      </div>
    )
  }
}

export default {
  Component: PageLoading,
  show () {
    PageLoading.instance && PageLoading.instance.show()
  },
  hide (isSuccess) {
    PageLoading.instance && PageLoading.instance.hide(isSuccess)
  },
  isVisible () {
    return PageLoading.instance.isVisible()
  }
}
