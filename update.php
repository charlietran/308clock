<?php
 
$github_ips = array('207.97.227.253', '50.57.128.197', '108.171.174.178', '50.57.231.61');
$github_cidrs = array('204.232.175.64/27', '192.30.252.0/22');

function cidr_match($ip, $ranges)
{
    $ranges = (array)$ranges;
    foreach($ranges as $range) {
        list($subnet, $mask) = explode('/', $range);
        if((ip2long($ip) & ~((1 << (32 - $mask)) - 1)) == ip2long($subnet)) {
            return true;
        }
    }
    return false;
}


if ( $_POST['payload'] && (in_array($_SERVER['REMOTE_ADDR'], $github_ips) || cidr_match($_SERVER['REMOTE_ADDR'], $github_cidrs)) ) {
  shell_exec( 'cd /home/charlie/charlietran.com/308office/ && git reset --hard HEAD && git pull' );
  echo 'Done.';
}
else {
  header('HTTP/1.1 404 Not Found');
  echo '404 Not Found.';
  exit;
}
 
?>
