import React, { Fragment } from "react"
import MetaTags from "react-meta-tags"
import MainLayoutShop from "../common/HOCS/MainLayoutShop"
import { multilanguage } from "redux-multilanguage"
import Slider from "../wrappers/Slider"
import FeatureIcon from "../wrappers/FeatureIcon"
import TabProduct from "../wrappers/TabProduct"

const Home = ({strings}) => {
  return (
    <Fragment>
      <MetaTags>
        <title>Banana Boys | {strings['home']}</title>
      </MetaTags>
      <MainLayoutShop
        headerTop='visible'
      >
        {/* hero slider */}
        <Slider />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="pet food" />

        {/* blog featured */}
        {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
      </MainLayoutShop>
    </Fragment>
  )
}

export default multilanguage(Home)
