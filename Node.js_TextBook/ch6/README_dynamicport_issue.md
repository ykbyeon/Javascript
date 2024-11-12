### 원본 : https://blog.laruyan.moe/2020/09/10-2004.html

다음은 **윈도10 포트 고갈(유령 점유) 문제 해결방법**에 대한 내용을 요약한 Markdown 문서입니다.

---



# 윈도10 포트 고갈(유령 점유) 문제 해결방법

## 문제 발생 배경
- 개발 도구(IntelliJ IDEA 등)나 로컬 서버 실행 시 특정 포트가 점유되어 프로그램이 실행되지 않거나, 포트가 자동으로 변경되는 문제가 발생.
- 특히, 웹 개발 시 리액트(React)는 기본적으로 포트 번호를 명시하지 않고 브라우저를 띄우기 때문에, 기본 포트(3000번)를 찾지 못해 불편함.
- `netstat`, `Process Explorer`, `TCPView` 등의 도구로 확인했을 때도 해당 포트가 점유되지 않은 것으로 나오는 경우가 있었음.

## 원인
- IntelliJ IDEA는 6942번부터 6991번까지의 포트를 사용하려고 시도하는데, 특정 네트워크 오류나 보안 소프트웨어로 인해 모든 포트가 점유될 수 있음.
- MySQL과 같은 다른 프로그램도 특정 포트를 사용하려고 할 때 유사한 문제가 발생.
- 재부팅 후 문제가 일시적으로 해결되지만, 다시 다른 포트가 점유되는 현상이 반복됨.

## 해결 방법

### 1. 동적 포트 범위 조회
Windows에서 동적 클라이언트 포트 범위를 확인하기 위해 다음 명령어를 사용:
```bash
netsh int ipv4 show dynamicport tcp
netsh int ipv4 show dynamicport udp
netsh int ipv6 show dynamicport tcp
netsh int ipv6 show dynamicport udp
```
예시 결과:
```bash
Protocol tcp Dynamic Port Range
Start Port : 1024
Number of Ports : 13977

Protocol udp Dynamic Port Range
Start Port : 49152
Number of Ports : 16384
```

### 2. 동적 포트 범위 수정 명령(참고)
동적 포트 범위를 수동으로 설정하여 문제를 해결할 수 있음. 다음 명령어를 사용하여 동적 포트 범위를 설정:
```bash
netsh int ipv4 set dynamicport tcp start=10000 num=1000
netsh int ipv4 set dynamicport udp start=10000 num=1000
netsh int ipv6 set dynamicport tcp start=10000 num=1000
netsh int ipv6 set dynamicport udp start=10000 num=1000
```
이 명령은 동적 포트를 10000번부터 10999번까지로 설정함.

### 3. 기본값으로 동적 포트 범위 복구하기
동적 포트를 기본값으로 복원하려면 UDP 설정 값을 복사하여 적용:
```bash
netsh int ipv4 set dynamicport tcp start=49152 num=16384
netsh int ipv4 set dynamicport udp start=49152 num=16384
netsh int ipv6 set dynamicport tcp start=49152 num=16384
netsh int ipv6 set dynamicport udp start=49152 num=16384
```

### 4. 적용 확인 및 재부팅 (선택 사항)
명령어 적용 후 다시 조회하여 변경 사항을 확인:
```bash
netsh int ipv4 show dynamicport tcp
netsh int ipv4 show dynamicport udp
```
변경 사항이 제대로 적용되었는지 확인 후, 재부팅을 통해 문제 해결 여부를 확인할 수 있음.

## 추가 정보
윈도우10 2004 인사이더 빌드에서 동적 포트 번호 범위가 변경되는 버그가 있었으며, 이로 인해 문제를 겪을 수 있음. 정식 버전으로 업데이트한 후에도 이 값이 원래대로 돌아오지 않을 수 있음.


이 문서는 윈도우10에서 발생하는 **포트 고갈(유령 점유) 문제**에 대한 원인과 해결 방법을 요약한 것입니다.

**Citations:**   
[1] https://blog.laruyan.moe/2020/09/10-2004.html   
[2] https://blog.laruyan.moe/2020/09/10-2004.html   
