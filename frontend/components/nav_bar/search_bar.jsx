import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bounds: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSubmit(e);
        }
    }

    handleChange(e) {
        this.setState({bounds: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/search');
        this.props.updateFilter(this.state.bounds);
    }

    render() {


        return(
            <form className="search-bar clear-fix">
                <input type="text" placeholder="Search" onChange={this.handleChange} value={this.state.bounds} onKeyPress={this.handleKeyPress} />
                <button type="button" onClick={this.handleSubmit}><i className="fas fa-search"></i></button>
            </form>
        )
    }
}

export default SearchBar;