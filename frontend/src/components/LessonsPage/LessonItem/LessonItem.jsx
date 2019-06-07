import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import {
    Form,
    FormTextField, ConfirmDialog, FormTextArea, LanguageDropDownList
} from 'components/controls';


import styles from './LessonItem.scss'

const MATH = 'math';
const RUS = 'rus';



export default class LessonItem extends React.Component {

    static propTypes = {




    };

    constructor(props) {
        super(props);
        this.state = {
            showDeletePopUp: false

        };
    }

    routeImg = (lessonType) => {
        if (lessonType == MATH)
            return (
                <div className={styles.math}></div>
            )
        if (lessonType == RUS) {
            return (
                <div className={styles.rus}></div>
            )
        }
    }

    handleDelete = () => {

    }

    renderEditBtns(showEditBtns) {

        if (!showEditBtns) return

        const editClass = className(styles.btnWrapper, styles.edit)
        const deleteClass = className(styles.btnWrapper, styles.delete)


        return (
            <div className={styles.controlsPart}>

                <div className={editClass}>
                    <span>EDIT</span>
                </div>

                <div
                    className={deleteClass}
                    onClick={this.handleDelete}
                >
                    <span>DELETE</span>
                </div>


            </div>
        )
    }


    render() {

        const { name, lessonType, year, location, description, showEditBtns } = this.props
        return (
            <div
                className={styles.itemWrapper}
            >
                <div className={styles.imgPart}>
                    {this.routeImg(lessonType)}
                </div>
                <div className={styles.textPart}>
                    <div className={styles.nameLine}>{name}</div>
                    <div className={styles.yearSity}>
                        <span className={styles.year}>{year}</span>
                        <span className={styles.sity}>{location}</span>
                    </div>
                    <div className={styles.description}>
                        {description}
                    </div>
                </div>
                {this.renderEditBtns(showEditBtns)}
            </div>
        )
    }
}


