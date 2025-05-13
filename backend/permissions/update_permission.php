<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE permissions SET
    name = :name,
    stock_type = :stock_type,
    menu_stuff = :menu_stuff,
    manage_data = :manage_data,
    manage_category = :manage_category,
    manage_unit = :manage_unit,
    view_withdraw = :view_withdraw,
    track_withdraw = :track_withdraw,
    request_more = :request_more,
    view_all_history = :view_all_history,
    history_receive = :history_receive,
    history_withdraw = :history_withdraw,
    history_adjust = :history_adjust,
    report_stock_balance = :report_stock_balance,
    report_receive_monthly = :report_receive_monthly,
    report_expense_yearly = :report_expense_yearly,
    report_withdraw = :report_withdraw,
    report_low_stock = :report_low_stock,
    approve_withdraw = :approve_withdraw,
    receive_goods = :receive_goods,
    adjust_stock = :adjust_stock,
    manage_company = :manage_company,
    manage_users = :manage_users,
    user = :user
WHERE id = :id";

$stmt = $conn->prepare($sql);
$stmt->execute($data);

echo json_encode(["status" => "success"]);
?>
