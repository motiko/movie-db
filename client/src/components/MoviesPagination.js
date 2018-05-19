import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { setPage } from './actionCreators';

class MoviesPagination extends Component {
  static propTypes = {
    curPage: PropTypes.number,
    totalPages: PropTypes.number,
    setPage: PropTypes.func.isRequired
  };

  static defaultProps = {
    curPage: 1,
    totalPages: 1
  };

  onPageSelect = page => {
    this.props.setPage(page);
  };

  componentDidMount() {
    this.onPageSelect(1);
  }

  render() {
    const { curPage, totalPages } = this.props;
    if (totalPages <= 1) {
      return null;
    }
    const displayPages = visiblePages(curPage, totalPages);
    return (
      <Pagination className="pagination">
        <PaginationItem disabled={curPage === 1}>
          <PaginationLink
            previous
            onClick={() => this.onPageSelect(curPage - 1)}
          />
        </PaginationItem>
        {displayPages.map(
          page =>
            page === null ? (
              '\u{2026}\u{2026}'
            ) : (
              <PaginationItem active={page === curPage} key={page}>
                <PaginationLink onClick={() => this.onPageSelect(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
        )}
        <PaginationItem disabled={curPage === totalPages}>
          <PaginationLink next onClick={() => this.onPageSelect(curPage + 1)} />
        </PaginationItem>
      </Pagination>
    );
  }
}

function visiblePages(curPage, totalPages, minRange = 5) {
  const maxPagesToDisplay = 20;
  if (totalPages <= maxPagesToDisplay) return range(1, totalPages);
  const firstRange = range(1, minRange);
  const lastRange = range(totalPages - minRange + 1, totalPages);
  if (curPage <= minRange)
    return [...range(1, curPage + minRange), null, ...lastRange];
  if (curPage >= totalPages - minRange)
    return [...firstRange, null, ...range(curPage - minRange, totalPages)];
  const midRange = range(
    Math.max(minRange + 1, curPage - Math.trunc(minRange / 2)),
    Math.min(totalPages - minRange, curPage + Math.trunc(minRange / 2))
  );
  return [...firstRange, null, ...midRange, null, ...lastRange];
}

function range(from, to) {
  const size = Math.max(0, to - from + 1);
  return [...Array(size)].map((_, i) => i + from);
}

const mapStateToProps = ({ curPage, totalPages }) => ({
  curPage,
  totalPages
});

export default connect(mapStateToProps, { setPage })(MoviesPagination);
