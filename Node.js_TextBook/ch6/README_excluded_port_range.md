포트 3306이 실제로 사용 중이지 않은데도 "이미 사용 중"이라는 오류가 발생하는 이유는 여러 가지가 있을 수 있습니다. 다음은 그 주요 원인과 해결 방법입니다.

### **1. 시스템에 의해 예약된 포트**
윈도우 시스템에서는 특정 포트를 예약해 두어 사용자가 접근할 수 없도록 설정하는 경우가 있습니다. 이 경우, 해당 포트는 실제로는 어떤 프로세스에 의해 사용 중이지 않지만, 시스템이 해당 포트를 점유하고 있어 충돌이 발생할 수 있습니다.

- **확인 방법**: 관리자 권한으로 명령 프롬프트를 열고 다음 명령어를 실행하여 예약된 포트 목록을 확인할 수 있습니다.
  
  ```bash
  netsh interface ipv4 show excludedportrange protocol=tcp
  ```

  이 명령어는 시스템에서 예약된 포트 범위를 보여줍니다. 만약 3306번 포트가 이 목록에 포함되어 있다면, 이는 시스템에 의해 예약된 상태일 수 있습니다[4].

- **해결 방법**: 예약된 포트를 삭제하려면 다음 명령어를 사용하여 해당 범위를 해제할 수 있습니다.

  ```bash
  netsh int ipv4 delete excludedportrange protocol=tcp startport=3306 numberofports=1
  ```

  또는 NAT(Network Address Translation) 서비스를 재시작하여 문제를 해결할 수도 있습니다.

  ```bash
  net stop winnat
  net start winnat
  ```

### **2. 이전 MySQL/MariaDB 인스턴스의 잔여 설정**
이전에 설치된 MySQL 또는 MariaDB 인스턴스가 완전히 제거되지 않았거나, 서비스가 비정상적으로 남아 있을 경우에도 포트 충돌 문제가 발생할 수 있습니다. 특히, MySQL이나 MariaDB의 이전 설정 파일이나 서비스가 남아 있으면 해당 포트를 계속해서 점유하려고 시도할 수 있습니다.

- **해결 방법**: 이전 MySQL/MariaDB 인스턴스를 완전히 제거하거나, 관련 서비스를 중지하고 삭제합니다. 또한, `my.ini` 파일에서 포트를 변경하거나 불필요한 설정을 제거하는 것도 도움이 될 수 있습니다[1][2].

### **3. 방화벽 또는 보안 소프트웨어**
방화벽이나 보안 소프트웨어가 특정 포트를 차단하거나 제한하고 있는 경우에도 "포트 사용 중" 오류가 발생할 수 있습니다. 이 경우, 해당 포트는 실제로 열려 있지 않지만 방화벽 규칙에 의해 접근이 차단되어 충돌이 발생합니다.

- **해결 방법**: 윈도우 방화벽 설정에서 3306번 포트에 대한 규칙을 확인하고, 필요시 해당 규칙을 수정하거나 예외 처리를 추가합니다[1].

### **4. 다중 NAT 환경**
다중 NAT(Network Address Translation) 환경에서는 동일한 공인 IP 주소를 사용하는 여러 장치가 동일한 포트를 사용할 때 충돌이 발생할 수 있습니다. 이 경우에도 "포트 사용 중" 오류가 발생할 가능성이 있습니다[3].

- **해결 방법**: 라우터나 네트워크 설정을 확인하고, 필요한 경우 다른 포트를 사용하도록 설정을 변경합니다.

### **요약**
포트 3306이 이미 사용 중이라는 메시지가 뜨는 이유는 다음과 같은 원인들 때문일 수 있습니다:
1. **시스템에 의해 예약된 포트**: `netsh` 명령어로 확인 후 해제.
2. **이전 MySQL/MariaDB 인스턴스의 잔여 설정**: 서비스 중지 및 삭제.
3. **방화벽 또는 보안 소프트웨어 문제**: 방화벽 규칙 확인 및 수정.
4. **다중 NAT 환경에서의 충돌**: 네트워크 설정 조정.

이러한 원인을 하나씩 점검하여 문제를 해결할 수 있습니다.

**Citations:**   
[1] https://devit.koreacreatorfesta.com/entry/MySQL-%EC%84%A4%EC%B9%98-%EC%A4%91-%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94-3306-%ED%8F%AC%ED%8A%B8-%EC%B6%A9%EB%8F%8C-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-3%EA%B0%80%EC%A7%80   
[2] https://dana-study-log.tistory.com/entry/MySQL-MySQL-%EC%84%A4%EC%B9%98-3306-Port-%EC%98%A4%EB%A5%98   
[3] https://patents.google.com/patent/KR101668099B1/ko   
[4] https://hiperzstudio.tistory.com/63   