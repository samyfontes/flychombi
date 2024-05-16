import react from 'react';

const Home = () => {
    return (
        <div>
            <div class="button-container">
                <button id="btn-origin" onclick="toggleSelect('origin')">
                    <select class="form-select" id="select-origin" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </button>
                <button id="btn-destination" onclick="toggleSelect('destination')">
                    <select class="form-select" id="select-destination" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </button>
            </div>
            <div class="slider-box">
                <ul>
                    <li><img src="img/s1.jpg" alt="" /></li>
                    <li><img src="img/s2.jpg" alt="" /></li>
                    <li><img src="img/s3.jpg" alt="" /></li>
                    <li><img src="img/s4.jpg" alt="" /></li>
                </ul>
            </div>
        </div>
    )
}

export default Home;