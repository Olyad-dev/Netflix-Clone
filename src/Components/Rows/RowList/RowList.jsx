import React from 'react'
import Row from '../SingleRow/Row'
import Request from '../../../Utils/Request';

function RowList() {
  return (
    <div>
      <Row
        title="NETFLIX ORIGINAL"
        fetchURL={Request.fetchNetflixOriginals}
        isLargeSize={true}
      />

      <Row
        title="TRENDING NOW"
        fetchURL={Request.fetchTrending}
        isLargeSize={true}
      />

      <Row
        title="TOP RATED"
        fetchURL={Request.fetchTopRatedMovies}
        isLargeSize={true}
      />

      <Row
        title="ACTION MOVIES"
        fetchURL={Request.fetchActionMovies}
        isLargeSize={true}
      />

      <Row title="COMEDY MOVIES" fetchURL={Request.fetchComedyMovies} isLargeSize={true}/>

      <Row title="HORROR MOVIES" fetchURL={Request.fetchHorror} isLargeSize={true}/>

      <Row title="ROMANCE MOVIES" fetchURL={Request.fetchRomanceMovies} isLargeSize={true}/>

      <Row title="DOCUMENTARIES" fetchURL={Request.fetchDocumantries} isLargeSize={true}/>
    </div>
  );
}

export default RowList
