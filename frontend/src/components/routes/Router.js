import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import RoleRoute from './RoleRouteContainer';

import history from 'store/history';

import TeacherLendingContainer from 'components/TeacherLending/TeacherLendingContainer';
import StartScreenContainer from 'components/StartScreen/StartScreenContainer';
import RoomPageContainer from 'components/RoomPage/RoomPageContainer';

import SignUpContainer from 'components/SignUp/SignUpContainer';

import SignInContainer from 'components/SignIn/SignInContainer';


import ForgotPasswordContainer from 'components/ForgotPassword/ForgotPasswordContainer';
import ResetPasswordContainer from 'components/ResetPassword/ResetPasswordContainer';


import LessonsPageContainer from 'components/LessonsPage/LessonsPageContainer';


import { TEACHER, STUDENT } from '../../sources/constants/userRoles'

export default class Router extends Component {


    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <RoleRoute
                        exact
                        path='/'
                        //component={LessonsPageContainer}
                         component={TeacherLendingContainer}
                    />
                    <RoleRoute
                        exact
                        path='/room'
                        component={RoomPageContainer}
                    />
                    <RoleRoute
                        exact
                        path='/teacher'
                        component={TeacherLendingContainer}
                    />
                    <RoleRoute
                        inline
                        exact
                        mode={TEACHER}
                        path='/signup'
                        component={SignUpContainer}
                    />
                    <RoleRoute
                        inline
                        exact
                        mode={TEACHER}
                        path='/login'
                        component={SignInContainer}
                    />
                    <RoleRoute
                        inline
                        exact
                        mode={TEACHER}
                        path='/confirm'
                        component={SignUpContainer}
                    />
                    <RoleRoute
                        inline
                        exact
                        mode={TEACHER}
                        path='/forgot'
                        component={ForgotPasswordContainer}
                    />
                    <RoleRoute
                        inline
                        exact
                        mode={TEACHER}
                        path='/resetpass'
                        component={ResetPasswordContainer}
                    />


                    <RoleRoute
                        signOnly
                        exact
                        path='/lessons'
                        component={LessonsPageContainer}
                    />
                </Switch>
            </ConnectedRouter>
        );
    }
}

