import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { paginationSongs, deleteListSong } from '../../redux/songReducer'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';
import history from '../../router/history'
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useSnackbar } from 'notistack';
import { getSecondsToMinutesAndSeconds } from '../../utils/FormatDateTime'
import { renderArtist } from '../../utils/UtilsFunction'
let reset = false;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const headCells = [
    { id: 'image', numeric: false, disablePadding: true, label: '#' },
    { id: 'id', numeric: true, disablePadding: true, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Tên Album' },
    { id: 'timePlay', numeric: true, disablePadding: false, label: 'Thời gian' },
    { id: 'countListen', numeric: true, disablePadding: false, label: 'Lượt nghe' },
    { id: 'artistSongs', numeric: true, disablePadding: false, label: 'Nghệ sĩ' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const listRemove = props.listRemove;
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOK = (option) => {
        if (option == 'ok') {
            dispatch(deleteListSong(listRemove))
            reset = true;
        }
        setOpen(false);
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Nutrition
                    </Typography>
                    <Button onClick={() => history.push(`/admin/create-song`)} style={{ fontSize: 'small', width: '300px' }} variant="contained" color="primary" >
                        <QueueIcon /> &ensp; Tạo Bài Hát Mới
                    </Button>
                </>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={() => handleClickOpen()} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>

                </Tooltip>
            )}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ fontSize: 'small' }} id="alert-dialog-slide-title">{"Xác nhận xóa"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Bạn có chắc chắn muốn xóa bài hát này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ fontSize: 'small' }} onClick={() => handleOK('ok')} color="primary">
                        OK
                    </Button>
                    <Button style={{ fontSize: 'small' }} onClick={() => handleOK('cancel')} color="secondary">
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable() {
    const [pagination, setPagination] = useState({
        page: 1,
        size: 5,
        field: '',
        order: '',
        search: ''
    })

    const [rows, setRows] = useState([])
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [flag, setFlag] = useState({});
    const [isDesc, setIsDesc] = useState(false)
    const [totalElements, setTotalElements] = useState(1);
    const [reset, setReset] = React.useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        dispatch(paginationSongs(pagination))
    }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search, reset]);
    const state = useSelector((states) => {
        return states.songReducer;
    });
    const initialState = () => {
        setRows(transferData(state.songs));
        setTotalElements(state.totalElements);
    }
    const transferData = (array) => {
        let result = [];
        if (array != undefined) {
            result = array.map((e) => {
                return { id: e.id, title: e.title, image: e.image, timePlay: e.timePlay, countListen: e.countListen, artistSongs: renderArtist(e.artistSongs) };
            })
        }
        return result;
    }

    useEffect(() => {
        showPopupBar(state.isDeleteSucess);
        setReset(state.isReset)
        setSelected([]);
    }, [state.isDeleteSucess])
    const showPopupBar = (flag) => {
        let variant = '';
        if (flag != undefined) {
            if (flag) {
                variant = 'success';
                enqueueSnackbar('Xóa thành công', { variant });
            } else {
                variant = '';
                enqueueSnackbar('Xóa thất bại. Có lỗi xảy ra vui lòng thử lại', { variant });
            }
        }
    }
    useEffect(() => {
        initialState();
    }, [state.songs, state.totalElements, state.currentPage, state.totalPages])
    const handleRequestSort = (event, property) => {
        let desc = !isDesc;
        setIsDesc(!isDesc);
        setFlag({ field: property, order: desc ? 'desc' : 'asc' });
        setPagination({ ...pagination, field: property, order: desc ? 'desc' : 'asc' })

    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        if (page != newPage) {
            setSelected([]);
        }
        setPagination({ ...pagination, page: (newPage + 1) })
        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {
        let value = parseInt(event.target.value);
        setRowsPerPage(value);
        setPagination({ ...pagination, page: 1, size: value })
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalElements - page * rowsPerPage);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar listRemove={selected} numSelected={selected.length} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={totalElements}
                        />
                        <TableBody>
                            {(rows != undefined ? rows : []).map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            <img style={{ width: '100%', boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', borderRadius: '6px' }} src={row.image} />
                                        </TableCell>
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="left"><Link to={`/admin/update-song/${row.id}`}>{row.title}</Link></TableCell>
                                        <TableCell align="right">{getSecondsToMinutesAndSeconds(Math.floor(row.timePlay))}</TableCell>
                                        <TableCell align="right">{row.countListen}</TableCell>
                                        <TableCell align="right">{row.artistSongs}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Căn lề"
            />
        </div>
    );
}