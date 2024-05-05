import Preloader from "../../GlobalComponent/Preloader/Preloader";
import { ListUsers } from "./ListUsers/ListUsers";
import { Paginator } from "../../GlobalComponent/Paginator/Paginator";
import { TFilter, getDataUsers, follow, unfollow } from "../../../Redux/findUsersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getFilter, getIsLoading, getPage, getPageSize, getTotalUsers, getUsers, getfollowingInProgress } from "../../../Redux/selectors";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterField } from "./FilterField/FilterField";

type TPFindUsers = {

};

type TUrlParams = {
    term?: string, 
    friend?: boolean | null, 
    currentPage?: number
    [key: string]: any
}

const urlParams = (params: TUrlParams) => { 
    let arrParams = [];
    let strParams;

    for(let param in params) {
        if(params[param] || typeof params[param] === "boolean") {
            arrParams.push(`${param}=${params[param]}`);
        }
    }

    strParams = "?" + arrParams.join("&");
    return strParams;
}

const parseUrlParams = (url: string) => {
    type TobjUrl = {
        [key: string]: any
    }

    let objUrl = new URL(url);
    let getParseParams: TobjUrl = {};

    for(let [name, value] of objUrl.searchParams) {
        try {
            getParseParams[name] = JSON.parse(value);
        } catch(e) {
            getParseParams[name] = value;
        }
    }

    return getParseParams;   
}


export const FindUsers: React.FC<TPFindUsers> = () => {
    let currentPage = useSelector(getPage);
    let isLoading = useSelector(getIsLoading);
    let followingInProgress = useSelector(getfollowingInProgress);
    let filter = useSelector(getFilter);
    let pageSize = useSelector(getPageSize);
    let totalUsers = useSelector(getTotalUsers);
    let users = useSelector(getUsers);
    let navigate = useNavigate();
    let location = useLocation();
    
    useEffect(() => {
        type TactuallyProps = {
            [key: string]: any
        }
        let actuallyProps: TactuallyProps = {
            currentPage, pageSize, filter: { ...filter }
        };

        let params = parseUrlParams(document.location.href);

        for(let key in params) {
            (key === "friend" || key === "term") ? actuallyProps.filter[key] = params[key] :  actuallyProps[key] = params[key];
        }

        dispatch(getDataUsers(actuallyProps.currentPage, actuallyProps.pageSize, actuallyProps.filter));
    }, []);
    
    useEffect(() => {
        let getParams = urlParams({ term: filter.term, friend: filter.friend, currentPage });

        navigate(`${location.pathname}${getParams}`)
    }, [filter, currentPage]);
    
    let dispatch = useDispatch();

    const clickPage = (numPage: number) => {
        dispatch(getDataUsers(numPage, pageSize, filter));
    };

    const followUser = (id: number) => {
        dispatch(follow(id));
    };

    const onFilterChanged = (filter: TFilter) => {
        dispatch(getDataUsers(pageSize, currentPage, filter));
    }

    const unfollowUser = (id: number) => {
        dispatch(unfollow(id))
    };

    return <div>
        <Paginator totalUsers={totalUsers} pageSize={pageSize} currentPage={currentPage} clickPage={clickPage} onFilterChanged={onFilterChanged} filter={filter} />
        <FilterField filter={filter} onFilterChanged={onFilterChanged}/>
        <div>{isLoading ? <Preloader /> : null}</div>
        <ListUsers users={users} followingInProgress={followingInProgress} follow={followUser} unfollow={unfollowUser} />
    </div>
};