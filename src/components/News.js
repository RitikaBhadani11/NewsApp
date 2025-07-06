import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  // Default props for the component
  static defaultProps = {
    category: 'general', // Default category is 'general'
    pageSize: 10,        // Default page size is 10 articles per page
    country: 'in'        // Default country is 'India'
  };

  // Prop type validation
  static propTypes = {
    category: PropTypes.string, // Ensures category is a string
    pageSize: PropTypes.number, // Ensures pageSize is a number
    country: PropTypes.string   // Ensures country is a string
  };
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("I am a constructor from the News Component");

    this.state = {
      articles: [], // Initialize with an empty array
      loading: false, // No loading initially
      page: 1, // Starting from page 1
      totalResults: 0 // Track total results for pagination
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`
  }

  // Fetch the news articles
  async updateNews() {
    const apiKey = process.env.REACT_APP_NEWS_API_KEY; // Access the API key from environment variables

    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=9b5b7f1fe5f24527a0f6644c7c45cd07&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.updateNews();
    });
  };

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1
    }, () => {
      this.updateNews();
    });
  };

  // Fetch news data on component mount
  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageurl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div>
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark btn-sm"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              className="btn btn-dark btn-sm"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
