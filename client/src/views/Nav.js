function Nav() {
    return (
        <div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="fw-bolder accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Action Group 1
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 1
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item <span className="badge bg-secondary">New</span></a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 2
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item <span className="badge bg-secondary">4</span></a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Action Group 2
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 1
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 2
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="fw-bolder accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Action Group 3
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 1
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                    Group 2
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">A second link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                                <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Nav;