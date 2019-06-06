import _ from 'lodash';
import classnames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './DropDownList.scss';
import classNames from 'classnames';
import {Scrollbars} from 'react-custom-scrollbars';

import onClickOutside from 'react-onclickoutside';

class DropDownList extends Component {
    static propTypes = {
        value: PropTypes.any,
        items: PropTypes.array,
        formatter: PropTypes.func,
        searchable: PropTypes.bool,
        disabled: PropTypes.bool,
        canBeNotSelected: PropTypes.bool,
        canBeSelectedAll: PropTypes.bool,
        multipleSelection: PropTypes.bool,
        multipleFormatter: PropTypes.func,
        onChange: PropTypes.func,
        customClassName: PropTypes.any,
        textFormatter: PropTypes.func,
        headClass: PropTypes.string,
        listClass: PropTypes.string,

    };

    static defaultProps = {
        value: null,
        items: [],
        formatter: _.identity,
        multipleFormatter: _.identity
    };

    state = {
        opened: false,
        search: ''
    };

    componentDidMount() {
        this.negotiateValue(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.isPropChanged('items', nextProps) && this.isPropNotChanged('value', nextProps))
            this.negotiateValue(nextProps);
    }

    isPropChanged(key, nextProps) {
        return nextProps[key] !== this.props[key];
    }

    isPropNotChanged(key, nextProps) {
        return !this.isPropChanged(key, nextProps);
    }

    negotiateValue(props) {
        const {canBeNotSelected, items, value} = props;
        if (canBeNotSelected)
            return;
        if (items.length === 0)
            return;

        const isItemExist = items.indexOf(value) >= 0;
        if (!isItemExist)
            this.notifyChangeItem(items[0]);
    }

    notifyChangeItem(item) {
        const nextValue = this.getNextValue(item);
        this.props.onChange({'target': {'value': nextValue}});
    }

    getNextValue(item) {
        if (!this.props.multipleSelection)
            return item;

        if (!item && !this.props.canBeSelectedAll) {
            const set = this.getSelectedItemSet();
            return this.collapseSelectedItemSet(set);
        }

        if (!item && this.props.canBeSelectedAll)
            return null;

        const selectedItemSet = this.getSelectedItemSet();

        if (selectedItemSet.has(item))
            selectedItemSet.delete(item);
        else
            selectedItemSet.add(item);

        return this.collapseSelectedItemSet(selectedItemSet);
    }

    getSelectedItemSet() {
        const {value} = this.props;

        if (!value)
            return new Set();

        if (_.isArray(value))
            return new Set(value);

        return new Set([value]);
    }

    collapseSelectedItemSet(itemSet) {
        const items = [...itemSet];

        if (items.length === 0)
            return null;

        return items;
    }

    render() {
        const {searchable, customClassName} = this.props;
        const {opened} = this.state;

        const displaySearchField = searchable && opened;
        const dropDownStyles = classnames(styles.dropDownList, customClassName);

        return (
            <div className={dropDownStyles}
                 >
                {displaySearchField ? this.renderSearchField() : this.renderHead()}
                {opened && this.renderList()}
            </div>
        );
    }

    renderSearchField() {
        const {search} = this.state;
        const {opened} = this.state;

        const headClassName = classNames(styles.head, {
            [styles.opened]: opened,
        });


        return (
            <input
                className={headClassName}
                value={search}
                autoFocus={true}
                ref='searchInput'
                onChange={this.handleChangeFilter}/>

        );
    }


    renderHead() {
        const {disabled, value, error, headClass} = this.props;
        const enabled = !disabled;
        const headClassName = classNames(styles.head, headClass, {
            [styles.notChosen]: !value || value.length === 0,
            [styles.highlightError]: error
        });

        return (
            <div className={headClassName}
                 onClick={enabled ? this.handleToggleDropDown : undefined}>
                {this.renderOption(value, 'head')}
            </div>
        );
    }

    renderList() {
        const items = this.getItems();
        const filteredItems = items.filter(this.filterItem);

        return (
            <div className={styles.list}>
                <Scrollbars autoHeight autoHeightMax={'15em'} className={styles.scroll}>
                    {filteredItems.map(this.renderOption)}
                </Scrollbars>
            </div>
        );
    }

    getItems() {
        const {items, canBeNotSelected} = this.props;

        if (canBeNotSelected)
            return [null, ...items];

        return items;
    }

    filterItem = item => {
        const {formatter} = this.props;
        const {search} = this.state;

        if (!Boolean(item)) return null
        return formatter(item, {}).toLowerCase()
            .startsWith(search.toLowerCase());
    };

    handleChangeFilter = ({target: {value}}) => {
        this.setState({search: value});
    };

    handleToggleDropDown = () => {
        this.setState({
            opened: !this.state.opened,
            search: ''
        });
    };

    renderOption = (item, index) => {

        const selected = this.isItemSelected(item);
        const option = index !== 'head';
        const head = !option;
        const {canBeNotSelected, listClass} = this.props;


        const itemClassName = classNames(styles.listItem, listClass, {
            [styles.listItemSelected]: selected,
            [styles.placeholder]: canBeNotSelected && !item,
        });
        const text = this.formatItem(item, {head});

        return (
            <div key={index}
                 className={itemClassName}
                 onClick={option ? this.handleChangeValue(item) : undefined}>
                {head ? text : this.formatText(item, text)}
            </div>
        );
    };

    formatText = (item, text) => {
        const {textFormatter} = this.props;
        if (!textFormatter)
            return text;
        return textFormatter(item, text);
    };

    isItemSelected(item) {
        const {value} = this.props;
        if (_.isArray(value))
            return value.includes(item);

        return value === item;
    }

    formatItem(item, {head}) {
        const {value, formatter, multipleFormatter} = this.props;

        if (head && _.isArray(value))
            return multipleFormatter(value);

        return formatter(item, {head})
    }

    handleChangeValue = (item) => () => {
        this.setState({
            search: ''
        }, () => {
            this.refs.searchInput && this.refs.searchInput.focus();
        });

        this.notifyChangeItem(item);

        if (!item || !this.props.multipleSelection)
            this.hideList();
    };

    hideList() {
        this.setState({
            opened: false,
            search: ''
        });
    }

    handleClickOutside = event => {
        this.hideList();
    };

    click = () => {
        this.handleToggleDropDown();
    }
}

export default onClickOutside(DropDownList);
