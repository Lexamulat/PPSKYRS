import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ProgressItem from './ProgressItem/ProgressItem';

export default class Progress extends React.PureComponent {

    static propTypes = {
        masOfItems: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0,
        };
    }

    switchActiveItem = (activeItemIndex) => () => {
        const {changeIndex} = this.props;
        this.setState({activeItemIndex})
        changeIndex(activeItemIndex);
    }

    render() {
        const {masOfItems} = this.props;
        const {activeItemIndex} = this.state;
        return (
            <div>
                {
                    masOfItems.map((el, i) => {
                        return (
                            <ProgressItem
                                key={i}
                                activeItemIndex={i}
                                switchActiveItem={this.switchActiveItem}
                                withoutConcatLine={i == masOfItems.length - 1}
                                text={loc(el.title)}
                                isActive={activeItemIndex == i}
                            />
                        )
                    })
                }
            </div>
        );

    }
}


