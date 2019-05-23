import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import styles from './ProgressItem.scss';

export default class ProgressItem extends React.PureComponent {


    static propTypes = {
        isActive: PropTypes.bool,
        withoutConcatLine: PropTypes.bool,
        text: PropTypes.string,
        activeItemIndex: PropTypes.number,
        switchActiveItem: PropTypes.func
    };


    render() {

        const {text, isActive, withoutConcatLine, activeItemIndex, switchActiveItem} = this.props;


        const textColorClass = classNames(styles.text, {
            [styles.activeTextClass]: Boolean(isActive),
        });

        return (
            <div className={styles.progressItemWrapper} onClick={switchActiveItem(activeItemIndex)}>
                <div className={styles.circleAndTextLine}>
                    {isActive ?
                        <div className={styles.activeCircle}></div>
                        :
                        <div className={styles.circle}></div>
                    }
                    <div className={textColorClass}>{text}</div>
                </div>
                {!withoutConcatLine && <div className={styles.verticalConcatLine}></div>}
            </div>
        );

    }
}


