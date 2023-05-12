using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webapi.Models.migrations
{
    /// <inheritdoc />
    public partial class InitialTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WarehouseJobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JobNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExternalRef = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsReceived = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseJobs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Boxes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BoxReference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Condtition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExepctedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReceivedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceivedOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WarehouseJobId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Boxes_WarehouseJobs_WarehouseJobId",
                        column: x => x.WarehouseJobId,
                        principalTable: "WarehouseJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Boxes_WarehouseJobId",
                table: "Boxes",
                column: "WarehouseJobId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Boxes");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "WarehouseJobs");
        }
    }
}
