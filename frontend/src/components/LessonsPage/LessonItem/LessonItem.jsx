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

    routeImg = () => {
        const { type } = this.props;
        if (type == MATH)
            return (
                <div className={styles.math}></div>
            )
        if (type == RUS) {
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


        return (
            <div
                className={styles.itemWrapper}
            >
                <div className={styles.imgPart}>
                    {this.routeImg()}
                </div>
                <div className={styles.textPart}>
                    <div className={styles.nameLine}>Иван</div>
                    <div className={styles.yearSity}>
                        <span className={styles.year}>21годssssssssssu</span>
                        <span className={styles.sity}>осква, Тsssssssssssssssssssssssssssssекстильщики, Юго-Восточный административный округ</span>
                    </div>
                    <div className={styles.description}>
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvdddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                        scccccccccccccccccccccccvddddddddddddddddscccccccccccccccccccccccvdddddddddddddddd
                    </div>
                </div>
                {this.renderEditBtns()}
            </div>
        )
    }
}


