import React, { Component as ReactComponent } from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

import { TEACHER, STUDENT } from '../../sources/constants/userRoles'

import TeacherLoginPagesWrapperContainer from 'components/TeacherLoginPagesWrapper/TeacherLoginPagesWrapperContainer';

import styles from './RoleRoute.scss';

export default class RoleRoute extends ReactComponent {

    static propTypes = {
        mode: PropTypes.string,
    };


    handleRender = ({ Component }) => (props) => {
        const { mode, signOnly, login } = this.props;
        if (signOnly) {
            if (login && login.role) {
                return <Component {...props} />;

            }
            this.props.onNavigate('/login')
            return <div></div>

        }
        if (mode == TEACHER) {
            return (
                <TeacherLoginPagesWrapperContainer>
                    <Component {...props} />
                </TeacherLoginPagesWrapperContainer>
            )
        }

        return <Component {...props} />;
    };

    render() {
        const { component: Component, inline, ...restProps } = this.props;
        return (

            <Route render={this.handleRender({ Component })} {...restProps} />

        );
        // return (
        //     <div className={styles.pageWrapper} style={inline ? {display: 'inline'} : {}}>
        //         <div className={styles.contentWrapper}>
        //             <Route render={this.handleRender({Component})} {...restProps}/>
        //         </div>
        //     </div>
        // );
    }
}