import React, { useEffect, useState, useRef, useCallback } from "react";
import { Marker } from "react-naver-maps";
import useBus from "../../model/useBus";
import busIcon from "../../assets/bus.svg";
import useBusData from "../../../../entities/Bus/useBusData";
const BusMarkers = () => {
  // 버스 좌표 상태
  const [bus, setBus, resetBus, moveBusEvent] = useBus();

  // 버스 데이터 통신
  const [busData, error] = useBusData();

  const [isBusDataUpdated, setIsBusDataUpdated] = useState(false);

  useEffect(() => {
    setIsBusDataUpdated(false); // 데이터 업데이트가 시작될 때 false로 초기화

    if (busData && busData.data) {
      setBus((prevBus) => {
        // 처음으로 데이터를 불러올 때 처리
        if (prevBus.length === 0) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
          return busData.data; // 처음 데이터는 그대로 저장
        }

        // 데이터가 업데이트되었는지 확인하는 플래그
        let isUpdated = false;
        console.log(busData);

        // 이전 버스 상태를 새로운 데이터로 업데이트
        const updatedBus = prevBus.map((busLocation, index) => {
          const newBusData = busData.data[index];

          // 데이터가 없을 경우 기존 상태 반환
          if (!newBusData) {
            return busLocation;
          }

          const prevLastNode = parseInt(busLocation.lastNode);
          const newLastNode = parseInt(newBusData.lastNode);

          // 노드가 변경되었을 때만 업데이트
          if (prevLastNode !== newLastNode) {
            console.log(prevLastNode, newLastNode);
            console.log(newBusData.lat, newBusData.lng, newBusData.lastNode);

            isUpdated = true; // 업데이트 감지
            return {
              ...busLocation,
              lat: newBusData.lat,
              lng: newBusData.lng,
              lastNode: newBusData.lastNode, // 새로운 노드 정보로 업데이트
            };
          }

          // 노드 변경이 없으면 기존 상태 유지
          return busLocation;
        });

        // 업데이트가 발생했을 경우에만 플래그 설정
        if (isUpdated) {
          setIsBusDataUpdated(true); // 데이터 업데이트 완료 표시
        }

        return updatedBus;
      });
    }
  }, [busData]);

  useEffect(() => {
    if (isBusDataUpdated) {
      moveBusEvent(); // 버스 좌표 주기적으로 업데이트
      setIsBusDataUpdated(false); // 상태 초기화 (필요에 따라)
    }
  }, [isBusDataUpdated]);

  return (
    <>
      {error ? (
        <div>오류</div>
      ) : (
        bus.map((busLocation, index) => {
          // 유효성 검사: position이 없을 경우 예외 처리
          if (!busLocation || !busLocation.lat || !busLocation.lng) {
            return null; // 유효하지 않은 경우 렌더링하지 않음
          }
          return (
            <Marker
              key={index}
              position={
                new window.naver.maps.LatLng(busLocation.lat, busLocation.lng)
              }
              icon={{
                content: `<img src="${busIcon}" width="20" height="20" />`,
              }}
            />
          );
        })
      )}
    </>
  );
};

export default BusMarkers;
