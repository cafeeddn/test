

function kakaoShare(){
    Kakao.Link.sendDefault({
                      objectType: 'feed',           // 메시지 타입
                          content: {
                        title: '청소년을 위한 개인정보보안인식 테스트',      // 공유 제목
                        description: '테스트를 통해 나의 개인정보보안인식정도를 알아보자!', // 설명
                        imageUrl: 'test/pnp.png', // 미리보기 이미지 URL
                        link: {
                          mobileWebUrl: 'https://yourwebsite.com', // 모바일 URL
                          androidExecParams : 'test',
                            webUrl: 'https://yourwebsite.com',        // PC URL
        },
      },
        social: {
            likeCount : 10,
            commenCount : 20,
            shareCount : 30,
        },
        
        buttons: [
            {
                title : '웹사이트로 이동',
                link : {
                    mobileWebUrl : '',
                },
            },
        
        ]
    });
    }
    
    