$(document).ready(function(){
	var $visual_navi=$('#visual_navi li');
	var $portF=$('#portF');

	//초기화면에 section이 앞으로 이동해서 마지막 article이 보여지도록 제어
	var total = $portF.children('.visual_list').length;
	var scrollMove = (total-3) * 360;
	$('html, body').stop().animate({scrollTop:scrollMove});

	//console.log(total, scrollMove, $(window).scrollTop());

	//스크롤이 일어날때 : section 태그를 animate(left)
	$(window).on('scroll',function  () {
		var scrollY=$(this).scrollTop();
		console.log( scrollY );
		if ( !$('#dim').is(':visible')) {
			$portF.stop().animate({left:-scrollY}, 660);
		}
	});
	
	//큰이미지의 alt 속성을 배열에 저장
	var bigAlt=new Array(total);
	bigAlt[0]='큰이미지 0번의 상세 설명입니다';
	bigAlt[1]='큰이미지 1번의 상세 설명입니다';
	bigAlt[2]='큰이미지 2번의 상세 설명입니다';
	bigAlt[3]='큰이미지 3번의 상세 설명입니다';
	bigAlt[4]='큰이미지 4번의 상세 설명입니다';
	bigAlt[5]='큰이미지 5번의 상세 설명입니다';
	bigAlt[6]='큰이미지 6번의 상세 설명입니다';
	bigAlt[7]='큰이미지 7번의 상세 설명입니다';
	bigAlt[8]='큰이미지 8번의 상세 설명입니다';
	bigAlt[9]='큰이미지 9번의 상세 설명입니다';

	//article>h3>a 클릭할 경우: 숨겨진 article의 상세내용 보이기
	$portF.find('.visual_list>h3>a').on({
		click:function  () {
			var bigSrc=$(this).attr('href');
			var tgNum=$(this).closest('.visual_list').index()-1;	//index()메서드는 부모안에 몇번째 자식인지를 의미, 첫번째 자식이 h2.blind 이므로 마이너스 1을 처리함
			var scrollNum=tgNum*360;
			//console.log(bigSrc, tgNum, scrollNum);

			//기존 article.on 제거, em과 .close 도 제거, 동적생성된 p도 제거 : 초기화
			$portF.children('.visual_list.on').removeClass('on').find('em, .close').stop().fadeOut().siblings('p').empty();

			//현재 em과 .close 도 보여지기, article.on 추가,  동적생성된 p도 추가
			$(this).parent().siblings('em, .close').stop().fadeIn().closest('.visual_list').addClass('on');
			$(this).parent().siblings('p').html('<img src="'+bigSrc+'" alt="'+bigAlt[tgNum]+'" />');

			//현재 열리는 article의 브라우저의 시작에 위치하도록 스크롤바 움직임
			$('html, body').stop().animate({scrollTop:scrollNum});
			
			return false;
		},
		focus:function  () {	//접근성을 살려서 키보드로 포커스가 갈경우 보여질수 있도록
			var tgNum=$(this).closest('.visual_list').index()-1;
			//console.log(tgNum);

			//기존 article.on 제거, em과 .close 도 제거, 동적생성된 p도 제거 : 초기화
			$portF.children('.visual_list.on').removeClass('on').find('em, .close').stop().fadeOut().siblings('p').empty();

			$('html, body').stop().animate({scrollTop:tgNum*230});
		}
	});

	//열려진 article의 닫기 버튼 클릭
	$portF.find('.visual_list .close').on('click',function  () {
		//자신의 article.on 제거, em과 .close 도 제거, 동적생성된 p도 제거 : 초기화
		$(this).parent().removeClass('on').children('em, .close').stop().fadeOut().siblings('p').empty();
		$(this).siblings('h3').children().focus();	//display:none으로 사라진 닫기 버튼때문에 포커스가 처음으로 튕겨져 나가서 강제로 포커스 이동시킴
	});
	
	//네비게이션을 클릭할 경우 : 스크롤바를 움직여서 section 태그를 이동
	var wid = 360;
	$visual_navi.children().on('click',function  () {
		var tgNum=$(this).attr('href');
		console.log(tgNum);		//0,3,4,7,9

		//네비게이션 li.on 추가
		$(this).parent().addClass('on').siblings().removeClass('on');

		//기존 article.on 제거, em과 .close 도 제거, 동적생성된 p도 제거 : 초기화
		$portF.children('.visual_list.on').removeClass('on').find('em, .close').stop().fadeOut().siblings('p').empty();

		$('html, body').stop().animate({scrollTop:tgNum*360});

		return false;
	});
});