import "./Lineselector.css";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbArrowsShuffle } from "react-icons/tb";
import Plusbutton from "./Plusbutton";
import { GiSteampunkGoggles } from "react-icons/gi";
import { MdSportsTennis } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function Lineselector({
  label1,
  setValue,
  childdata,
  lineindex,
  ltryid,
  show,
  array,
  text
}) {
  const [count, setCount] = useState(0);
  const [temparr, setTemparr] = useState([]);
  // const [show, setShow] = useState(true);
  const [showchk, setShowchk] = useState(false);
  const [selection, setSelection] = useState([]);
  const [arr, setArr] = useState([]);
  // const [final, setFinal] = useState([]])
  let selectionarray = [];
  const linearray = useSelector((state) => state.linearray);
  const offerarray=useSelector((state)=>state.offerarray);
  // const ltryid = useSelector((state) => state.ltryid);
  const ltryname = useSelector((state) => state.ltryname);
  // console.log("id and name",ltryid,ltryname)
  const dispatch = useDispatch();
  var num = 3;
  var limit = 39;

  useEffect(()=>{
    
  console.log("show",show)
  },[])
  // useMemo(() => {

  //   for (var i = num; i <= limit; i++) {
  //     selectionarray.push([{ value: i, selected: false }])
  //     // selectionarray=[...selectionarray,[{ value: i, selected: false }]]
  //   }
  //   console.log(selectionarray)
  //   setArr(selectionarray)
  // }, [])

  const handleClick = (e, indx) => {
    console.log(text)

    let temp = [...array];
    let count=0;
    for (const iterator of temp[lineindex]) {
      if(iterator.isselected)
        count++
    }
    if(count<5){
       temp[lineindex][indx].isselected = !temp[lineindex][indx].isselected;

      // console.log(temp[lineindex][indx].isselected);
    //   if(text=="linearray"){
    //     dispatch({ type: "setLineArray", payload: temp });
    //   }
    //  else{
    //   console.log("dispatching offer")
    //   dispatch({ type: "setOfferArray", payload: temp });
    //  }

    }else if(temp[lineindex][indx].isselected ){
      temp[lineindex][indx].isselected = !temp[lineindex][indx].isselected;

      // console.log(temp[lineindex][indx].isselected);
      
      if(text=="linearray"){
        dispatch({ type: "setLineArray", payload: temp });
      }
     else{
      dispatch({ type: "setOfferArray", payload: temp });
     }

    }
   
  };

 

  const shuffle = () => {
    console.log(text)
    let temp = [...array];
    console.log(temp)
    const randomarray = [];
    let ta = [];
    let r;
    let randomnum=[]
    while (randomnum.length < 5) {
      r = Math.floor(Math.random() * (limit - num)) + num;
      if (randomnum.indexOf(r) == -1) {
        randomnum.push(r);
        ta.push({ value: r, selected: true });
      }
    }
    for (const eleent of temp[lineindex]) {
      eleent.isselected = false;
    }

    for (const eleent of temp[lineindex]) {
      for (const elt of ta) {
        if (eleent.value == elt.value) {
          eleent.isselected = true;
          // test.push({ value: eleent.value, selected: true });
          //test[lineindex] = [test.push(eleent.value)];
          // setFinal({lineindex:test})
        }
      }
    }
    
    if(text=="linearray"){
      dispatch({ type: "setLineArray", payload: temp });
    }
   else{
    dispatch({ type: "setOfferArray", payload: temp });
   }

  };
  const handlerefresh = () => {
    const tempsel = [...array];
    console.log(text)
    console.log("tempsel",tempsel)
    for (const eleent of tempsel[lineindex]) {
      
      eleent.isselected = false;
    }
    if(text=="linearray"){
      dispatch({ type: "setLineArray", payload: tempsel });
    }
   else{
    console.log("refresh")
    dispatch({ type: "setOfferArray", payload: tempsel });
   }
  };
  return (
    <div className="Lineselector">
      {/* <Plusbutton
        show={show}
        setShow={setShow}
        showchk={showchk}
        setShowchk={setShowchk}
      /> */}
      <div className="Header">{label1}</div>
      <div className="Middle">
        <>
         {show ? linearray[lineindex].map((item, index) => {
            return (
              <>
                <button
                  key={item.value}
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  style={{
                    backgroundColor:
                      item.isselected === true ? "#3ea6d6" : "white",
                  }}
                >
                  {item.value}
                </button>
              </>
            );
          }):offerarray[lineindex].map((itm, indx) => {
            return (
              <>
                <button
                  key={itm.value}
                  onClick={(e) => {
                    handleClick(e, indx);
                  }}
                  style={{
                    backgroundColor:
                      itm.isselected === true ? "#3ea6d6" : "white",
                  }}
                >
                  {itm.value}
                </button>
              </>
            );
          })}  
        </>
      </div>
      <div className="Footer">
        <button>
          {" "}
          <TbArrowsShuffle onClick={shuffle} />
        </button>
        {/* <button onClick={(e) => { childdata(e, selection, setShowchk) }} className="lineselector_confrimbtn">Confirm</button> */}
        <button>
          {" "}
          <AiOutlineClose onClick={handlerefresh} />
        </button>
      </div>
    </div>
  );
}
