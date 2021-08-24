import React from 'react'
import loaderImage from '../../resource/images/loader.gif'
import Menu from '../../components/Menu/Menu'
import Header from '../../components/Header/Header';
import PlayAudioSection from '../../components/PlayAudio/Play'
import Footer from '../../components/Footer/Footer'
import { Route, Switch } from 'react-router';
import { routerClients } from '../../router/router'
import SearchComponent from '../../components/Search/Search'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from "react-transition-group";
const ShowContent = (props) => {

    let result = [];
    if (props.router.length > 0) {
        result = props.router.map((e, i) => {
            return (
                <Route key={i + 1 + ''} path={e.path} title={e.name} component={e.component} exact={e.exact} />
            );
        })
    }
    return result;;
}
const Home = () => {

    return (
        <>

            {/* <!----Loader Start----> */}
            <div className="ms_loader">
                <div className="wrap">
                    <img src={loaderImage} alt="" />
                </div>
            </div>
            {/* <!----Main Wrapper Start----> */}
            <div class="ms_main_wrapper">
                {/* <!---Side Menu Start---> */}
                <Menu />
                {/* <!---Side Menu End---> */}
                {/* <!---Main Content Start---> */}
                <div className="ms_content_wrapper padder_top80">
                    {/* <!---Header---> */}
                    {/* <TransitionGroup>
                        <CSSTransition
                            key='1'
                            classNames="fade"
                            timeout={300}
                        > */}
                            <Header />
                            <Switch>
                                <ShowContent router={routerClients} />
                            </Switch>
                        {/* </CSSTransition>
                    </TransitionGroup> */}
                </div>
                <Footer />
                {/* <!---Main Content End---> */}

                {/* <!----Audio Player Section----> */}
                <PlayAudioSection />
            </div>
        </>
    );
}
export default Home;