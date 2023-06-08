import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  articles = [
    {
      source: { id: null, name: "Deadline" },
      author: "Rosy Cordero",
      title:
        "Def Leppard Drummer Rick Allen Shares Health Update Following Violent Attack - Deadline",
      description:
        "Def Leppard drummer Rick Allen is speaking out for the first time following a violent attack on March 13 in South Florida. “Thank you everyone for your overwhelming support. Your love and pra…",
      url: "https://deadline.com/2023/03/def-leppard-drummer-rick-allen-health-update-violent-attack-1235304279/",
      urlToImage:
        "https://deadline.com/wp-content/uploads/2023/03/GettyImages-145832843.jpg?w=1024",
      publishedAt: "2023-03-20T04:16:00Z",
      content:
        "Def Leppard drummer Rick Allen is speaking out for the first time following a violent attack on March 13 in South Florida. \r\n“Thank you everyone for your overwhelming support. Your love and prayers a… [+1509 chars]",
    },
    {
      source: { id: "the-times-of-india", name: "The Times of India" },
      author: "Joel Rebello",
      title:
        "UBS-Credit Suisse merger: Role rationalisation may lead to job cuts at India-based tech centres - The Economic Times",
      description:
        "Both UBS and CS have about 7,000 people each across three Indian cities in their technology centres. After the merger, role rationalisation is likely to lead to many job losses in these areas as UBS will seek to retain only the best talent at Credit Suisse.",
      url: "https://economictimes.indiatimes.com/news/company/corporate-trends/ubs-credit-suisse-merger-role-rationalisation-may-lead-to-job-cuts-at-india-based-tech-centres/articleshow/98842144.cms",
      urlToImage:
        "https://img.etimg.com/thumb/msid-98842316,width-1070,height-580,imgsize-113102,overlay-economictimes/photo.jpg",
      publishedAt: "2023-03-21T00:27:00Z",
      content:
        "UBS and Credit Suisse's India-based technology back offices, which together employ about 14,000 people, will likely see the maximum impact of the mega bailout in Swiss banking as rationalisation of r… [+3078 chars]",
    },
    {
      source: { id: null, name: "Sportskeeda" },
      author: "Arya Sekhar Chakraborty",
      title:
        "3 bowlers India can groom as their answer to Mitchell Starc - Sportskeeda",
      description:
        "Aussie speedster Mitchell Starc wreaked havoc during the 2nd ODI against India, bagging his 9th ODI five-wicket haul to dismantle India for a paltry 117 to ensure a smooth pathway for Australia’s conv",
      url: "https://www.sportskeeda.com/cricket/3-bowlers-india-can-groom-answer-mitchell-starc",
      urlToImage:
        "https://staticc.sportskeeda.com/editor/2023/03/c3c25-16793536294709-1920.jpg",
      publishedAt: "2023-03-21T00:52:21Z",
      content:
        "Aussie speedster Mitchell Starc wreaked havoc during the 2nd ODI against India, bagging his 9th ODI five-wicket haul to dismantle India for a paltry 117 to ensure a smooth pathway for Australias conv… [+3561 chars]",
    },
  ];

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("constructor of news");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 4
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsBot`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b9f198476d3f4f85b691409e426e1620&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        
    })
};

  render() {
    return (
      <>
        {/* <div className="container my-3"> */}
        <h1 className="text-center" style={{ margin: "45px 0px",marginTop: "80px" }}>
          NewsBot - top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}

        {/* console.log("{this.state.articles.length}")
        console.log({this.state.totalResults})
        console.log({this.fetchMoreData}) */}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        > */}
        
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4">
                    <NewsItem
                      key={element.url}
                      title={ (typeof element.title === 'undefined' || element.title === null )? "title": element.title }
                      description={
                        element.description ? element.description : " "
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://cdn.ndtv.com/common/images/ogndtv.png"
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : " " }
                      date={element.publishedAt ? element.publishedAt :  " "}
                      source={element.source.name ? element.source.name : " "}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        
          {/* </InfiniteScroll> */}
          {/* </div> */}
          <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
        
        
     
      </>
    );
  }
}
export default News;
