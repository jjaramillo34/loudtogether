import React from "react";

const CassettePlayer = () => {
  return (
    <div className="flex flex-col items-start bg-white min-h-[780px] w-[375px]">
      <div
        className="flex flex-col items-start bg-cover bg-center gap-[123px] min-h-[669px] w-[375px]"
        style={{
          backgroundImage:
            "url('/img/cassette--play-view-background--overlay-A08EEFA0-F7F0-41C9-AB34-8CB84937664F.png')",
        }}
      >
        {/* Navigation bar */}
        <div className="flex justify-end bg-[#22242ad9] border border-[#00000036] min-w-[375px] px-4">
          <div className="relative h-[65px] w-[308px]">
            <div className="absolute right-0 top-0 h-[65px] w-[184px] font-bold text-right text-white text-xs tracking-[6px] leading-[14px] shadow-md">
              {/* Text action content */}
            </div>
            <div className="absolute left-0 top-0 h-[65px] w-[272px] font-bold text-center text-white text-xs tracking-[9px] leading-[14px] shadow-md">
              LOUDTOGETHER
            </div>
          </div>
        </div>

        <div className="flex h-[326px] -ml-[75px] transform -rotate-90 w-[523px]">
          <div className="mixtape flex-1 min-w-[523px]">
            <div className="relative w-[540px] h-[352px] -left-[12px] -top-[8.4px]">
              <img
                className="absolute left-[20px] top-[31px] w-[498px] h-[303px]"
                src="/img/cassette--play-tape-0DBA5464-CEAA-464C-82AC-288D012136B4.png"
                alt="Tape"
              />
              <div className="absolute left-[2px] top-[11px] w-[293px] h-[293px]">
                <img
                  className="absolute left-[32px] top-0 w-[230px] h-[229px]"
                  src="/img/cassette--play-tape-AF4B0553-8365-4821-B3AF-C564B46FADCB@2x.png"
                  alt="Tape"
                />
                <div className="absolute left-[90px] top-[92px] w-[107px] h-[107px]">
                  <img
                    className="absolute left-[27px] top-[27px] w-[54px] h-[54px]"
                    src="/img/cassette--play-combined-shape-DED061D1-011D-4C41-87C2-77015164FC70@2x.png"
                    alt="Combined Shape"
                  />
                  <img
                    className="absolute left-[4px] top-[4px] w-[99px] h-[99px]"
                    src="/img/cassette--play-combined-shape-A386D78C-C3B4-4B44-88BC-62E377D0075B@2x.png"
                    alt="Combined Shape"
                  />
                  {[2, 3, 9, 10, 11, 12, 13, 14, 15, 4].map((num) => (
                    <img
                      key={num}
                      className={`combined-shape-${num}`}
                      src="/img/cassette--play-combined-shape-091BC1BB-24E7-43C8-97C4-C3C633D7E899@2x.png"
                      alt="Combined Shape"
                    />
                  ))}
                  <img
                    className="combined-shape-5"
                    src="/img/cassette--play-combined-shape-3392ECE0-005E-452F-8A46-9030C422BA8C@2x.png"
                    alt="Combined Shape"
                  />
                  <img
                    className="combined-shape-6"
                    src="/img/cassette--play-combined-shape-EF86252C-4FAA-4D49-9149-E2A65BCE8864@2x.png"
                    alt="Combined Shape"
                  />
                  <img
                    className="combined-shape-7"
                    src="/img/cassette--play-combined-shape-18882561-2486-46E0-8112-4B9C4958EF7F@2x.png"
                    alt="Combined Shape"
                  />
                  <div className="rectangle-5-4 rectangle-5-8"></div>
                  <div className="rectangle-5"></div>
                  <div className="rectangle-5-1 rectangle-5-8"></div>
                  <div className="rectangle-5-2 rectangle-5-8"></div>
                  <div className="rectangle-5-3 rectangle-5-8"></div>
                  <div className="rectangle-5-5 rectangle-5-8"></div>
                  <img
                    className="clip"
                    src="/img/cassette--play-clip-B7A3C475-037E-47A4-B784-A8D874BCCD6D@2x.png"
                    alt="Clip"
                  />
                </div>
                <img
                  className="reel absolute left-1 top-50 w-[293px] h-[293px]"
                  src="/img/cassette--play-reel-56739B3A-1515-4A82-9887-DFEC465DE3DB@2x.png"
                  alt="Reel"
                />
              </div>
              <div className="reel-tape absolute left-[274px] top-[38px] w-[235px] h-[235px] transform rotate-75">
                <div className="relative w-[293px] h-[293px]">
                  <img
                    className="tape-2 tape-3 absolute left-[32px] top-0 w-[230px] h-[229px]"
                    src="/img/cassette--play-tape-AF4B0553-8365-4821-B3AF-C564B46FADCB@2x.png"
                    alt="Tape"
                  />
                  <div className="overlap-group-1 absolute left-[90px] top-[92px] w-[107px] h-[107px]">
                    {/* Repeat similar structure as above for the right reel */}
                  </div>
                  <img
                    className="reel absolute left-0 top-0 w-[293px] h-[293px]"
                    src="/img/cassette--play-reel-56739B3A-1515-4A82-9887-DFEC465DE3DB@2x.png"
                    alt="Reel"
                  />
                </div>
              </div>
              <img
                className="frame absolute left-[8px] top-[7px] w-[525px] h-[339px]"
                src="/img/cassette--play-frame-F8B4638E-6ED8-4541-95B0-6AA14F7B616F.png"
                alt="Frame"
              />
              <img
                className="reel-bottom-left reel-bottom absolute left-[37px] top-[280px] w-[48px] h-[42px]"
                src="/img/cassette--play-reel-bottom-left-DA20C74C-4A5C-4FA3-B4E6-846BE5F5B8BF@2x.png"
                alt="reel bottom left"
              />
              <div className="reel-bottom-right reel-bottom absolute left-[453px] top-[279px] flex gap-[10px]">
                <div className="relative w-[31px] h-[31px]">
                  <img
                    className="fill-9 absolute left-[3px] top-[3px] w-[25px] h-[25px]"
                    src="/img/cassette--play-fill-9-C87CE8CC-A833-4104-ACB3-6FCF0C713212@2x.png"
                    alt="Fill 9"
                  />
                  <div className="wheel absolute left-[3px] top-[3px] w-[25px] h-[25px] flex items-center justify-center">
                    <div className="overlap-group-2">
                      <img
                        className="fill-16 w-[11px] h-[11px]"
                        src="/img/cassette--play-fill-16-48890118-D6D3-4795-B7DA-D9144CA5647B@2x.png"
                        alt="Fill 16"
                      />
                    </div>
                  </div>
                  <img
                    className="fill-21 absolute left-[19px] top-[19px] w-[8px] h-[8px]"
                    src="/img/cassette--play-fill-21-9AAF25D2-84A8-4852-827A-DA5DEC6A020F@2x.png"
                    alt="Fill 21"
                  />
                  <img
                    className="fill-24 absolute left-[18px] top-[18px] w-[8px] h-[8px]"
                    src="/img/cassette--play-fill-24-012B7F06-2636-4C92-B5FB-C6772258C2AF@2x.png"
                    alt="Fill 24"
                  />
                  <img
                    className="fill-2 absolute left-[21px] top-[9px] w-[7px] h-[9px]"
                    src="/img/cassette--play-fill-26-3C4D7D1B-70A6-46A8-A32B-35FB434B560E@2x.png"
                    alt="Fill 26"
                  />
                  <img
                    className="fill-2 absolute left-[21px] top-[9px] w-[7px] h-[9px]"
                    src="/img/cassette--play-fill-29-ADEAA65C-89C7-49B6-B6B6-0E412C25BDC9@2x.png"
                    alt="Fill 29"
                  />
                  <img
                    className="fill-31 absolute left-[14px] top-[3px] w-[8px] h-[7px]"
                    src="/img/cassette--play-fill-31-EB47443E-E27D-494B-95FE-0E961256C662@2x.png"
                    alt="Fill 31"
                  />
                  <img
                    className="fill-34 absolute left-[14px] top-[3px] w-[9px] h-[7px]"
                    src="/img/cassette--play-fill-34-92E49A3E-B9B1-4517-95BA-17E03C20BC43@2x.png"
                    alt="Fill 34"
                  />
                  <img
                    className="fill-3 absolute left-[5px] top-[5px] w-[8px] h-[8px]"
                    src="/img/cassette--play-fill-36-B9A8FC08-FDD6-4489-A15C-6476754A118B@2x.png"
                    alt="Fill 36"
                  />
                  <img
                    className="fill-3 absolute left-[5px] top-[5px] w-[8px] h-[8px]"
                    src="/img/cassette--play-fill-39-D77C01F3-23EC-4352-ADD3-BB798B284F63@2x.png"
                    alt="Fill 39"
                  />
                  <img
                    className="overlap-group3-item absolute left-[3px] top-[14px] w-[7px] h-[9px]"
                    src="/img/cassette--play-clip-42-AAAF66B0-CD55-4561-B09B-13A31488724C@2x.png"
                    alt="Clip 42"
                  />
                  <img
                    className="overlap-group3-item absolute left-[3px] top-[14px] w-[7px] h-[9px]"
                    src="/img/cassette--play-fill-41-6ACD69E7-5C07-4E21-906E-2532D7213865@2x.png"
                    alt="Fill 41"
                  />
                  <img
                    className="overlap-group3-item absolute left-[3px] top-[14px] w-[7px] h-[9px]"
                    src="/img/cassette--play-fill-44-5820C11B-BB10-4054-8370-1A905B98D4D6@2x.png"
                    alt="Fill 44"
                  />
                  <img
                    className="fill-49 absolute left-[9px] top-[21px] w-[9px] h-[7px]"
                    src="/img/cassette--play-fill-49-8BB5E91A-8770-4C90-8E0C-84410EFB535A@2x.png"
                    alt="Fill 49"
                  />
                </div>
                <img
                  className="stop w-[15px] h-[11px] mt-[-4px]"
                  src="/img/cassette--play-stop-7013DBC5-EFCB-4528-AE5B-37F8B261DFC0@2x.png"
                  alt="Stop"
                />
              </div>
              <img
                className="forcella absolute left-[91px] top-[260px] w-[359px] h-[82px]"
                src="/img/cassette--play-forcella-7C07D6DF-E46E-4780-8F84-D450E4C4C932.png"
                alt="Forcella"
              />
              <img
                className="body absolute left-0 top-0 w-[540px] h-[352px]"
                src="/img/cassette--play-body-081EDB4A-61A0-4EEC-8B9A-F80A50033B8D.png"
                alt="Body"
              />
              <img
                className="window absolute left-[31px] top-[98px] w-[478px] h-[111px]"
                src="/img/cassette--play-window-9CF53D49-6344-4BDD-B1B5-C78BD2ABC406.png"
                alt="Window"
              />
              <img
                className="top absolute left-[81px] top-[246px] w-[375px] h-[104px]"
                src="/img/cassette--play-top-C9A9D84C-7B0A-4DF5-879A-D9371B924FF9.png"
                alt="Top"
              />
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (position) => (
                  <div
                    key={position}
                    className={`screw-${position} screw-${
                      position.split("-")[0]
                    } absolute w-[22px] h-[22px] rounded-full border border-[#00000036] shadow-md flex items-center justify-center`}
                    style={{
                      left: position.includes("right") ? "499px" : "19px",
                      top: position.includes("bottom") ? "307px" : "15px",
                    }}
                  >
                    <img
                      className="combined-shape-8 w-[10px] h-[10px] transform rotate-45"
                      src="/img/cassette--play-combined-shape-25161FFF-D6C8-4830-8BF4-854D0EBBE9B4@2x.png"
                      alt="Combined Shape"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Controls section */}
        <div className="flex flex-col bg-[#22242afa] min-h-[143px] w-[375px]">
          <div className="bg-[#f9f9f9] shadow-md h-[2px] w-[329px]"></div>
          <div className="self-end mr-[6px] mt-[23px] relative h-[30px] w-[291px]">
            <div className="absolute right-0 top-0 w-[73px] text-white text-right text-sm tracking-[4px] leading-[14px]">
              {/* Runtime content */}
            </div>
            <p className="absolute left-0 top-0 text-white text-sm tracking-[4px] leading-[15px] whitespace-nowrap font-serif">
              Robi Draco — Mad Love
            </p>
          </div>
          <div className="self-center mt-[9px] relative h-[54px] w-[226px]">
            <div className="absolute left-[8px] top-0 bg-[#22242a] border border-[#00000036] rounded-[27px] shadow-lg h-[54px] w-[211px]"></div>
            <div className="absolute left-0 top-[14px] h-[26px] w-[226px] font-bold text-center text-white text-xs tracking-[9px] leading-[14px]">
              JOIN
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CassettePlayer;
