export interface IParam<T> {
  size?: number;
  page?: number;
  params?: T | null | undefined;
}

export interface IBoard {
  /* 게시판 코드 */
  ciCode: number;
  /* 글번호 */
  ciContentno: number;
  /* 제목 */
  ciTitle: string;
  /* 사용자ID */
  ciId: string;
  /* 사용자 비번 */
  ciPwd?: string;
  /* 사용자이름 */
  ciName: string;
  /* 등록일자 */
  ciNalja: string;
  /* 등록시간 */
  ciTime: string;
  /* 조회수 */
  ciHit: number;
  /* ref */
  ciRef: number;
  /* step */
  ciStep: number;
  /* level */
  ciRevel: number;
  /* 비번 */
  ciPass?: string;
  /* email */
  ciEmail: string;
  /* 내용 */
  ciContents: string;
  /* IP */
  ciIp: string;
}

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  profileImgUrl: string;
}

export interface TicketType {
  id: number;
  eventId: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  leftCnt: number;
  isPublicLeftCnt: boolean;
  maxCntPerPerson: number;
  salesStartAt: string;
  salesEndAt: string;
  refundEndAt: string;
}

export interface EventCard {
  id: number;
  mainImg: string;
  startAt: string;
  title: string;
  name: string;
  price: number;
  to?: string;
}

export interface EventDetail {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  latitude: number;
  longitude: number;
  mainImg: string;
  desc: string;
  ticketType: TicketType;
  user: User;
}

export interface Token {
  exist: boolean;
  id: number;
  googleId: number;
  email: string;
}

export interface BoughtTicketEvent {
  id: number;
  userId: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  firstName: string;
  lastName: string;
  ticket: {
    id: number;
    eventId: number;
    name: string;
    desc: string;
    price: number;
    quantity: number;
    leftCnt: number;
    isPublicLeftCnt: boolean;
    maxCntPerPerson: number;
    salesStartAt: string;
    salesEndAt: string;
    refundEndAt: string;
  };
  userTickets: [
    {
      id: number;
      ticketTypeId: number;
      userId: number;
      isAttendance: boolean;
      createdAt: string;
    }
  ];
}

export interface CreatedEvent {
  id: number;
  userId: number;
  title: string;
  startAt: string;
  endAt: string;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
}

export interface SearchMapResult {
  address: string;
  latitude: number;
  longitude: number;
}
