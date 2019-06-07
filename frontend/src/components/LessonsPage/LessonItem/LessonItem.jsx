import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';



import styles from './LessonItem.scss'

const MATH = 'math';
const RUS = 'rus';



export default class LessonItem extends React.Component {

    static propTypes = {




    };

    constructor(props) {
        super(props);
        this.state = {

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

    renderEditBtns() {

        const editClass = className(styles.btnWrapper, styles.edit)
        const deleteClass = className(styles.btnWrapper, styles.delete)

        return (
            <div className={styles.controlsPart}>

                <div className={editClass}>
                    <span>EDIT</span>
                </div>

                <div className={deleteClass} >
                    <span>DELETE</span>
                </div>


            </div>
        )
    }


    render() {

        const { name, lessonType, year, location, description } = this.props
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
                {this.renderEditBtns()}
            </div>
        )
    }
}


