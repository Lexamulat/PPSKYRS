import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';


import {
    ConfirmDialog, ShowResultDialog
} from 'components/controls';



import styles from './LessonItem.scss'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const MATH = 'math';
const RUS = 'rus';



export default class LessonItem extends React.Component {

    static propTypes = {
    };

    constructor(props) {
        super(props);
        this.state = {
            isDeleteDialogVisible: false,
            isEditDialogVisible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.getLessonById && nextProps.getLessonById) {
            const { id } = this.props
            if (id == nextProps.getLessonById.id) {
                this.toggleEditDialog();

            }
        }
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

    sendCtoggleEditDialogreateLesson = (name, lessonType, year, location, description) => {
        const { id } = this.props;
        this.props.onEditLessonById(id, name, lessonType, year, location, description);
        this.toggleEditDialog();
    }

    handleOpenEdit = (evt) => {
        const { id } = this.props;
        this.props.onGetLessonById(id);
    }

    handleDelete = () => {
        const { id } = this.props;
        this.props.handleDeleteLessonAction(id);
        this.toggleDeleteDialog();
    }

    toggleEditDialog = () => {
        const { id } = this.props;
        console.log('id', id)
        console.log('toggleEdit')
        const { isEditDialogVisible } = this.state;

        this.setState({ isEditDialogVisible: !isEditDialogVisible })
    }


    toggleDeleteDialog = () => {
        const { isDeleteDialogVisible } = this.state;

        this.setState({ isDeleteDialogVisible: !isDeleteDialogVisible })
    }

    renderDeleteReportDialog = () => {
        const { isDeleteDialogVisible } = this.state;
        if (!isDeleteDialogVisible) return;
        return (
            <ConfirmDialog
                text={'Confirm delete'}
                onCancel={this.toggleDeleteDialog}
                onClose={this.toggleDeleteDialog}
                onOk={this.handleDelete}
            />
        )
    }

    renderEditReportDialog = () => {

        const { isEditDialogVisible } = this.state;
        if (!isEditDialogVisible) return;

        const { getLessonById } = this.props;
        return (
            <ShowResultDialog
                title={'Edit lesson'}
                onClose={this.toggleEditDialog}
                onAction={this.toggleEditDialog}
                submitAction={this.sendCtoggleEditDialogreateLesson}
                toggleCreateAction={this.toggleEditDialog}
                {...getLessonById}
            />
        )
    }



    renderEditBtns(showEditBtns) {
        if (!showEditBtns) return
        const editClass = className(styles.btnWrapper, styles.edit)
        const deleteClass = className(styles.btnWrapper, styles.delete)


        return (
            <div className={styles.controlsPart}>

                <div className={editClass}
                    onClick={this.handleOpenEdit}
                >
                    <span>EDIT</span>
                </div>

                <div
                    className={deleteClass}
                    onClick={this.toggleDeleteDialog}
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
                {this.renderDeleteReportDialog()}
                {this.renderEditReportDialog()}

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


