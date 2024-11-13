export default function SearchInput() {
    return (
        <div id="wd-search-input" className="text-nowrap">
            <div className="position-relative" style={{ width: "100%", maxWidth: "250px", minWidth: "150px" }}>
                <input 
                    type="text" 
                    className="form-control form-control-lg ps-5" 
                    placeholder="Search..." 
                    style={{ paddingLeft: "35px", width: "100%" }}
                />
            </div>
        </div>
    );
}

