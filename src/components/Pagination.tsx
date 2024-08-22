import React, { useState } from 'react';

// PaginationProps 타입 정의
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  /* onPageChange = handlePageChange */

  const [currentPageGroup, setCurrentPageGroup] = useState<number>(1); /* 현재 페이지 그룹의 번호 */

  const pagesPerGroup = 5; // 한 그룹에 표시할 페이지 번호의 수
  const totalPageGroups = Math.ceil(totalPages / pagesPerGroup); // 전체 페이지 그룹의 수
  
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber); /* setCurrentPage(pageNumber); */
  };

  const handleNextGroupClick = () => {
    if (currentPageGroup < totalPageGroups) {
      setCurrentPageGroup(currentPageGroup + 1); /* > 버튼 */
    }
  };

  const handlePrevGroupClick = () => {
    if (currentPageGroup > 1) {
      setCurrentPageGroup(currentPageGroup - 1); /* < 버튼 */
    }
  };

  const renderPageNumbers = () => { /* 숫자버튼들 */
    const startPage = (currentPageGroup - 1) * pagesPerGroup + 1; /* 표시할 시작 버튼 숫자 */
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); /* 표시할 마지막 버튼 숫자,
    마지막 그룹의 페이지의 경우 없는 페이지를 표현하는 것을 방지하기 위해서 */

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''} /* 현재 클릭된 버튼에게 색깔을 주기 위해 클래스 부여 */
          onClick={() => handlePageClick(i)} /* 현재 누른 button의 키값으로 currentPage의 state를 바꿈, 위에 클래스가 같이 작동 */
        >
          <p className='member-page-number'>
            {i}
          </p>
        </button>
      );
    }
    return pageNumbers; /* renderPageNumbers를 실행하면 수에 맞는 숫자버튼들을 담은 배열 반환 */
  };

  return (
    <div className="pagination">
      <button
        onClick={() => {
          handlePageClick(1);
          setCurrentPageGroup(1);
        }}
        disabled={currentPage === 1}
      >
        <p className='member-page-prev-next'>&lt;</p><p className='member-page-prev-next2'>&#124;</p>
      </button>
      <button
        onClick={() => {
          handlePageClick(currentPage - 1);
          currentPage == ((currentPageGroup - 1) * pagesPerGroup + 1) && handlePrevGroupClick();
        }}
        disabled={currentPage === 1}
      >
        <p className='member-page-prev-next'>&lt;</p>
      </button>
      {renderPageNumbers()} {/*숫자버튼들*/}
      <button
        onClick={() => {
          console.log(currentPage);
          handlePageClick(currentPage + 1); // setCurrentpage(currentPage + 1);
          console.log(currentPage, pagesPerGroup * currentPageGroup);
          (currentPage == (pagesPerGroup * currentPageGroup)) && handleNextGroupClick();
          console.log(currentPage, pagesPerGroup * currentPageGroup);
        }}
        disabled={currentPage === totalPages}
        /* 그룹은 handleNextGroupClick()에서 막아놨으나 이 기능이 켜져있지 않으면 계속 다음페이지로 넘어감 */
      >
        <p className='member-page-prev-next'>&gt;</p> 
      </button>
      <button
        onClick={() => {
          handlePageClick(totalPages);
          setCurrentPageGroup(totalPageGroups);
        }}
        disabled={currentPage === totalPages}
      >
        <p className='member-page-prev-next2'>&#124;</p><p className='member-page-prev-next'>&gt;</p>
      </button>
    </div>
  );
};

export default Pagination;
