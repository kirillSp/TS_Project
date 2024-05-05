import React, { useState, FC } from "react";
import S from "./PaginatorS.module.css";
import { TFilter } from "../../../Redux/findUsersReducer";

type PropsType = {
    totalUsers: number
    pageSize: number
    currentPage: number
    clickPage: (numPage: number) => void
    sectionSize?: number
    onFilterChanged: (filter: TFilter) => void
    filter: TFilter
}

export let Paginator: React.FC<PropsType> = ({ totalUsers, pageSize, currentPage, clickPage, sectionSize = 5, onFilterChanged, filter }) => {
    let totalPages = Math.ceil(totalUsers / pageSize);
    let renderPages: Array<number> = [];

    for (let numPage = 1; numPage <= totalPages; numPage++) {
        renderPages.push(numPage)
    }

    let totalSection = Math.ceil(totalPages / sectionSize);
    let [currentSection, setSection] = useState(1);
    let firstPageSection = (currentSection - 1) * sectionSize + 1;
    let lastPageSection = currentSection * sectionSize;

    return <div className={S.numPage}>
        {
            currentSection > 1 && <button onClick={() => { setSection(currentSection - 1) }}>prev</button>
        }

        {
            renderPages
                .filter(numPage => numPage >= firstPageSection && numPage <= lastPageSection)
                .map((numPage, i) => {
                    let cnVal = (currentPage === numPage ? S.selected : "") + " " + S.pages;

                    return <span className={cnVal} key={i} onClick={() => { clickPage(numPage) }}>{
                        numPage
                    }</span>

                })
        }

        {
            currentSection < totalSection && <button onClick={() => setSection(currentSection + 1)}>next</button>
        }
    </div>
};

