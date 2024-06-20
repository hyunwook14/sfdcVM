import { LightningElement, track } from 'lwc';
import MAP_IMAGE from '@salesforce/resourceUrl/DEMO_Map_Image';
import MAP_IMAGE1 from '@salesforce/resourceUrl/DEMO_Map_Image1';
import MAP_IMAGE2 from '@salesforce/resourceUrl/DEMO_Map_Image2';
import MAP_IMAGE3 from '@salesforce/resourceUrl/DEMO_Map_Image3';
import MAP_IMAGE4 from '@salesforce/resourceUrl/DEMO_Map_Image4';

export default class Demo_Maps extends LightningElement {
    @track mapUrl = MAP_IMAGE;
    @track mapUrl1 = MAP_IMAGE1;
    @track mapUrl2 = MAP_IMAGE2;
    @track mapUrl3 = MAP_IMAGE3;
    @track mapUrl4 = MAP_IMAGE4;

    customStyle = `
        .slds-template_default {
            padding: 0;
        }
        .schedule .calendar .date-picker input {
            padding: 0;
            border: 0;
            background-color: #eee;
            width: 32px;
            color: #eee;
        }
        
        .schedule .side-bar-body .store .store-header button {
            width: 100%;
        }

        .schedule .slds-pill {
            border: none;
            position: relative;
            background-color: initial;
            bottom: 5px;
        }

        .slds-tabs_default__content header-tap-item {
            display: flex;
            justify-content: space-between;
        }
    `;

    @track headerTabs;
    @track headerTabItems;
    @track subTabs;
    @track subTabItems;
    
    @track dragBox;
    startX;
    startY;
    endX;
    endY;
    onMouse = false;

    todate;
    targetDate = new Date().toLocaleDateString();
    dateArray = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    timeList = [];

    onTheMapTitle = 'All';

    mapList_1 = [
        {
            index: 0,
            title: '1. 홈플러스 방학점'
        },
        {
            index: 1,
            title: '2. 홈플러스 중계점'
        },
        {
            index: 2,
            title: '3. 홈플러스 신내점'
        },
        {
            index: 3,
            title: '4. 홈플러스 상봉점'
        },
        {
            index: 4,
            title: '5. 홈플러스 면목점'
        },
        {
            index: 5,
            title: '6. 홈플러스 동대문점'
        },
        {
            index: 6,
            title: '7. 홈플러스 월곡점'
        },
    ];
    mapList_2 = [
        {
            index: 0,
            title: '1. 홈플러스 간석점'
        },
        {
            index: 1,
            title: '2. 홈플러스 월드컵점'
        },
        {
            index: 2,
            title: '3. 홈플러스 부천상동점'
        },
        {
            index: 3,
            title: '4. 홈플러스 의정부점'
        },
        {
            index: 4,
            title: '5. 홈플러스 북수원점'
        },
        {
            index: 5,
            title: '6. 홈플러스 영등포점'
        },
        {
            index: 6,
            title: '7. 홈플러스 킨텍스점'
        },
        {
            index: 7,
            title: '8. 홈플러스 안양점'
        },
        {
            index: 8,
            title: '9. 홈플러스 남현점'
        },
        {
            index: 9,
            title: '10. 홈플러스 동대문점'
        },
    ];
    mapList_3 = [
        {
            index: 0,
            title: '1. 홈플러스 가양점'
        },
        {
            index: 1,
            title: '2. 홈플러스 강서점'
        },
        {
            index: 2,
            title: '3. 홈플러스 월드컵점'
        },
        {
            index: 3,
            title: '4. 홈플러스 합정점'
        },
        {
            index: 4,
            title: '5. 홈플러스 영등포점'
        },
    ];
    mapList_4 = [
        {
            index: 0,
            title: '1. 홈플러스 부천소사점'
        },
        {
            index: 1,
            title: '2. 홈플러스 금천점'
        },
        {
            index: 2,
            title: '3. 홈플러스 부천여월점'
        },
        {
            index: 3,
            title: '4. 홈플러스 남현점'
        },
    ];

    mapList_all = [
        {
            index: 0,
            title: '1. 홈플러스 파주 운정점'
        },
        {
            index: 1,
            title: '2. 홈플러스 킨텍스점'
        },
        {
            index: 2,
            title: '3. 홈플러스 고양터미널점'
        },
        {
            index: 3,
            title: '4. 홈플러스 김포점'
        },
        {
            index: 4,
            title: '5. 홈플러스 김포풍무점'
        },
        {
            index: 5,
            title: '6. 홈플러스 의정부점'
        },
        {
            index: 6,
            title: '7. 홈플러스 방학점'
        },
        {
            index: 7,
            title: '8. 홈플러스 중계점'
        },
        {
            index: 8,
            title: '9. 홈플러스 월곡점'
        },
        {
            index: 9,
            title: '10. 홈플러스 상봉점'
        },
        {
            index: 10,
            title: '11. 홈플러스 동대문점'
        },
        {
            index: 11,
            title: '12. 홈플러스 상봉점'
        },
        {
            index: 12,
            title: '13. 홈플러스 진접점'
        },
        {
            index: 13,
            title: '14. 홈플러스 강동점'
        },
        {
            index: 14,
            title: '15. 홈플러스 경기하남점'
        },
        {
            index: 15,
            title: '16. 홈플러스 잠실점'
        },
        {
            index: 16,
            title: '17. 홈플러스 야탑점'
        },
        {
            index: 17,
            title: '18. 홈플러스 분당오리점'
        },
        {
            index: 18,
            title: '19. 홈플러스 안양점'
        },
        {
            index: 19,
            title: '20. 홈플러스 남현점'
        },
        {
            index: 20,
            title: '21. 홈플러스 인천논현점'
        },
        {
            index: 21,
            title: '22. 홈플러스 송도점'
        },
        {
            index: 22,
            title: '23. 홈플러스 간석점'
        },
        {
            index: 23,
            title: '24. 홈플러스 작전점'
        },
        {
            index: 24,
            title: '25. 홈플러스 부천소사점'
        },
        {
            index: 25,
            title: '26. 홈플러스 금천점'
        },
        {
            index: 26,
            title: '27. 홈플러스 신도림점'
        },
        {
            index: 27,
            title: '28. 홈플러스 합정점'
        },
        {
            index: 28,
            title: '29. 홈플러스 강서점'
        },
        {
            index: 29,
            title: '30. 홈플러스 부천여월점'
        }
    ];

    @track eventList = [];
    @track storeList = this.mapList_all;
    @track itemCnt = 0;

    setCustomStyle(style, id) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('id', id);
        styleElement.innerHTML = style;
        document.head.appendChild(styleElement);
    }

    connectedCallback() {
        this.setCustomStyle(this.customStyle, 'demo-maps-custom-style');
        
        const today = new Date();

        this.todate = this.dateArray[today.getDay()];
        this.targetDate = today.toLocaleDateString();

        const timeList = [];
        const eventList = [];

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                const info = {
                    id:hour+'_'+minute,
                    title: displayHour + ':' + (minute < 10 ? '0' : '') + minute + ' ' + ampm,
                    hour: hour,
                    minute: minute,
                    ampm: ampm,
                    retail: ''
                };
                eventList.push(info);
                if(minute !== 15 && minute !== 45) timeList.push(info);
            }
        }

        this.timeList = timeList;
        this.eventList = eventList;

        this.itemCnt = this.storeList.length;
    }

    renderedCallback() {
        console.log('renderedCallback');
        this.headerTabs = this.template.querySelectorAll('.header-tabs .slds-tabs_default__item');
        this.headerTabItems = this.template.querySelectorAll('.header-tap-item');
        this.subTabs = this.template.querySelectorAll('.header-tap-item .slds-tabs_default__nav .slds-tabs_default__item');
        this.subTabItems = this.template.querySelectorAll('.header-tap-item .slds-tabs_default__content');
        this.dragBox = this.template.querySelector('.drag-box');
        this.template.querySelectorAll('.map-container').forEach(e => e.setAttribute('style', `background-image: url(${this.mapUrl});`));
        // document.body.addEventListener('click', (event) => {
        //     if(this.onMouse) {
        //         this.onMouse = false;
        //         this.dragBox.style.display = 'none';
        //         this.dragBox.style.height = '1px';
        //         this.dragBox.style.width = '1px';
        //         this.dragBox.style.left = '0px';
        //         this.dragBox.style.top = '0px';
        //     }
        // });
    }

    handleClickTab(event) {
        this.headerTabsVisible(event.currentTarget.dataset.index);
    }
    
    handleClickMain(event) {
        this.mapUrl = MAP_IMAGE;
        this.storeList = this.mapList_all;
        this.itemCnt = this.storeList.length;
        this.onTheMapTitle = 'All';
        this.headerTabsVisible(event.currentTarget.dataset.index);
    }

    handleClickSubTab(event) {
        this.subTabsVisible(event.currentTarget.dataset.index);
    }

    handleClickRecentItem(event) {
        this.mapUrl = this[`mapUrl${event.currentTarget.dataset.map}`];
        this.onTheMapTitle = event.currentTarget.innerText.split('target')[1].trim();
        this.storeList = this[`mapList_${event.currentTarget.dataset.map}`];
        this.itemCnt = this.storeList.length;

        this.subTabsVisible('2');
    }

    handleMapMouseDown(event) {
        this.startX = event.pageX;
        this.startY = event.pageY;

        this.dragBox.style.left = this.startX + 'px';
        this.dragBox.style.top = this.startY + 'px';
        this.dragBox.style.display = 'block';
        this.dragBox.style.opacity = '0.7';
        this.dragBox.style.width = '0px';
        this.dragBox.style.height = '0px';

        this.onMouse = true;
        this.template.addEventListener('mousemove', e => this.handleMapMouseMove(e));
    }

    handleMapMouseUp(event) {
        this.onMouse = false;
        this.dragBox.style.opacity = '0.5';
        this.template.removeEventListener('mousemove', e => this.handleMapMouseMove(e));
    }

    handleMapMouseMove(event) {
        if(!this.onMouse) return;
        if(event.offsetX < 1 || event.offsetY < 1) return;

        this.endX = event.pageX;
        this.endY = event.pageY;
        
        this.dragBox.style.width = Math.abs(this.endX - this.startX) + 'px';
        this.dragBox.style.height = Math.abs(this.endY - this.startY) + 'px';
        this.dragBox.style.left = Math.min(this.endX, this.startX) + 'px';
        this.dragBox.style.top = Math.min(this.endY, this.startY)-90 + 'px';
    }

    handleClickDragBox(event) {
        this.headerTabsVisible('2');
    }

    dragItem = {};
    handleDragText(event) {
        this.dragItem.retail = event.target.dataset?.id;
        this.dragItem.index = event.target.dataset?.index;
    }

    cancel(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    handleDragComplete(event) {
        let findId = event.target.dataset?.id;
        this.eventList.forEach(element => {
            if(element.id == findId){
                element.retail = this.dragItem.retail;
                element.index = this.dragItem.index;
            } 
        });
        this.storeList = this.storeList.filter((element) => element.title !== this.dragItem.retail);
    }

    handleRemove(event) {
        event.preventDefault();
        this.eventList = this.eventList.filter((element) => element.retail !== event.target.dataset?.id);
        let pushObj = {index:event.target.dataset?.index,title:event.target.dataset?.id};
        this.storeList.push(pushObj);
        this.storeList.sort((a, b) => { return a.index < b.index ? -1 : a.index > b.index ? 1 : 0; });
    }
    // onItemMouse = false;
    // @track itemDragBox;
    // iStartX;
    // iStartY;

    // handleItemDown(event) {
    //     console.log('handleItemDown');
    //     this.onItemMouse = true;
    //     this.itemDragBox = this.template.querySelector('.item-drag-box');
    //     this.iStartX = event.clientX;
    //     this.iStartY = event.clientY;
    //     this.itemDragBox.style.display = 'block';
    //     this.itemDragBox.style.left = this.iStartX + 'px';
    //     this.itemDragBox.style.top = this.iStartY + 'px';
    // }

    // handleItemUp(event) {
    //     console.log('handleItemUp');
    //     this.onItemMouse = false;
    //     this.itemDragBox.style.display = 'none';
    //     this.itemDragBox.style.top = '0';
    //     this.itemDragBox.style.left = '0';
    //     this.itemDragBox.style.height = '0px';
    //     this.itemDragBox.style.width = '0px';
    // }

    // handleItemMove(event) {
    //     if(!this.onItemMouse) return;
    //     if(event.clientX < 1 || event.clientY < 1) return;
    //     console.log('handleItemMove');
    //     const endX = event.clientX;
    //     const endY = event.clientY;
        
    //     this.itemDragBox.style.width = Math.abs(endX - this.iStartX) + 'px';
    //     this.itemDragBox.style.height = Math.abs(endY - this.iStartY) + 'px';
    //     this.itemDragBox.style.left = Math.min(endX, this.iStartX) + 'px';
    //     this.itemDragBox.style.top = Math.min(endY, this.iStartY) + 'px';
    // }
    
    handleClickAddSchedule(event) {
        const today = new Date();
        const hour = today.getHours();
        const min = today.getMinutes();

        const defaultLength = 4;
        const storeSize = this.storeList.length;
        const divCount = 4 * storeSize;
        const endHour = hour + storeSize;
        const targetTimes = [];

        // this.eventList.forEach(e => {
        //     if(e.hour >= hour && e.hour <= endHour) {
        //         if(e.hour === hour && e.minute >= min) {
        //             targetTimes.push(e);
        //         } else if(e.hour === endHour && e.minute <= min) {
        //             targetTimes.push(e);
        //         } else if(e.hour !== hour && e.hour !== endHour) {
        //             targetTimes.push(e);
        //         }
        //     }
        // });

        // console.log(structuredClone(targetTimes));
        let idx;
        this.eventList.forEach((e,index) => {
            console.log(idx);
            console.log(!idx);
            if(e.hour === hour && (e.minute >= min || e.minute === 45) && !idx) {
                console.log('???');
                idx = index;
            }
        });
        console.log(idx);
        console.log(structuredClone(this.eventList[idx]));
    }

    headerTabsVisible(index) {
        this.headerTabs.forEach((e, idx) => {
            e.classList.remove('slds-is-active');
            if((idx+'' === index)) {
                e.classList.add('slds-is-active');
            }
        });
        this.headerTabItems.forEach((e, idx) => {
            if ((idx+'') === index) {
                e.classList.add('slds-show');
                e.classList.remove('slds-hide')
            } else {
                e.classList.add('slds-hide');
                e.classList.remove('slds-show');
            }
        });
    }

    subTabsVisible(index) {
        this.subTabs.forEach((e, idx) => {
            e.classList.remove('slds-is-active');
            if((idx+'' === index)) {
                e.classList.add('slds-is-active');
            }
        });
        this.subTabItems.forEach((e, idx) => {
            if ((idx+'') === index) {
                e.classList.add('slds-show');
                e.classList.remove('slds-hide')
            } else {
                e.classList.add('slds-hide');
                e.classList.remove('slds-show');
            }
        });
    }
}