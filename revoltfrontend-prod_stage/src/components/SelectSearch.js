import { useEffect, useState } from "react";
import $ from "jquery";

const SelectSearch = ({ list, item, setItem, selected }) => {
  const [search, setSearch] = useState("");
  const [modifiedList, setList] = useState();
  useEffect(() => {
    closeDropDown();
  }, []);

  useEffect(() => {
    if (selected && list) {
      setSearch(list.filter((item) => item.id == selected)[0].company_name);
      setItem(selected);
      closeDropDown();
    }
  }, [list]);
  useEffect(() => {
    console.log("hellloo");
    let regex = /[^a-zA-Z0-9]/g;
    let searchString = search.toUpperCase().replace(regex, "");
    let filteredList = list?.filter((item) => {
      let data = item.company_name.toUpperCase().replace(regex, "");
      if (
        searchString.length &&
        data
          .slice(
            0,
            searchString.length < data.length
              ? searchString.length
              : data.length,
          )
          .includes(searchString)
      ) {
        return true;
      }
      return false;
    });
    if (filteredList?.length && search.length > 3 && !selected) {
      setList([...filteredList].slice(0, 3));
      console.log("List is", modifiedList);
    } else {
      setList([]);
    }
  }, [search]);

  function openDropDown() {
    var e = document.getElementById("dropDownList");
    if (e?.style) {
      e.style.display = "block";
    }
    $(".slectName").addClass("active");
  }

  function closeDropDown() {
    var e = document.getElementById("dropDownList");
    if (e?.style) {
      e.style.display = "none";
    }
    $(".slectName").removeClass("active");
  }

  const checkStatus = async (e) => {
    setTimeout(() => {
      closeDropDown();
    }, 500);
  };

  const handleSearch = (e) => {
    console.log("value is", e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div onFocus={openDropDown} onBlur={checkStatus}>
      <div className="selectCityDropdown">
        <div>
          <input
            id="company-name"
            className="form-control inputfield"
            style={{ border: "none" }}
            type="text"
            placeholder="Select Company Name"
            onChange={handleSearch}
            value={search}
            disabled={selected ? true : false}
          />
          {/* <span><i className="fa fa-angle-down"></i></span> */}
        </div>
        {modifiedList?.length ? (
          <div className="dropDownList" id="dropDownList">
            <ul
              style={{
                overflow: "auto",
                border: "1px solid black",
                height: "100%",
                borderRadius: "5px",
                borderTop: "0px",
              }}
            >
              {modifiedList?.map((e, key) => {
                return (
                  <li key={key}>
                    <span
                      onClick={() => {
                        setItem(e.id);
                        setSearch(e.company_name);
                      }}
                      id={e.id}
                      className={`${e.id == item ? "active" : ""}`}
                      value={e.id}
                      key={key}
                    >
                      {e.company_name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
      {/* <div className='selectedCity' id='cityListed'>
            {cityUpdate?.map((e, key) => { 
                  return (
                      <div key={key} onClick={removeLocation} value={e.city_id} className="selectedCitys">{e.city_name} <span><i className="fa fa-times"></i></span></div> 
                  );
            })}
    </div> */}
    </div>
  );
};

export default SelectSearch;
