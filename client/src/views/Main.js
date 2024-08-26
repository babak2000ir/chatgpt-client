import { fetchCall } from '../services/fetchSvc';
function Main() {

    const handleClick = () => {
        fetchCall('api', {}, 'post')
            .then(data => window.alert(data))
            .catch(error => window.alert(error));
    }

    return (
        <div>
            <div className="container">
                <div className="container p-2">
                    <div><h1>Titre</h1></div>
                    <div>Sous<a>-titre</a> at <span>08:21pm, July 13, 2001</span></div>
                </div>
                <div className="container p-2">
                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Try me
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={handleClick}>Hello World</a></li>
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                            </ul>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                            </ul>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                <table className="table table-striped-columns">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry the Bird</td>
                                            <td>@twitter</td>
                                            <td>@dude</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">@</span>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <span className="input-group-text" id="basic-addon2">@example.com</span>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="basic-url" className="form-label">Your vanity URL</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
                                        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" />
                                    </div>
                                    <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">$</span>
                                    <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                                    <span className="input-group-text">.00</span>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" />
                                    <span className="input-group-text">@</span>
                                    <input type="text" className="form-control" placeholder="Server" aria-label="Server" />
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text">With textarea</span>
                                    <textarea className="form-control" aria-label="With textarea"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-text">
                                        <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
                                    </div>
                                    <input type="text" className="form-control" aria-label="Text input with checkbox" />
                                </div>

                                <div className="input-group">
                                    <div className="input-group-text">
                                        <input className="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input" />
                                    </div>
                                    <input type="text" className="form-control" aria-label="Text input with radio button" />
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
                                    <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                                </div>

                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                    <input type="text" className="form-control" placeholder="" aria-label="Example text with two button addons" />
                                </div>

                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" />
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                </div>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                                    </ul>
                                    <input type="text" className="form-control" aria-label="Text input with dropdown button" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Main;